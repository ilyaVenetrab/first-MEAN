import { Component, OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { ILocation } from '../locations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-one-location',
	templateUrl: './one-location.component.html',
	styleUrls: ['./one-location.component.scss'],
})
export class OneLocationComponent implements OnInit {
	public location$: Observable<ILocation> = this._activatedRoute.data.pipe(pluck('location'));

	public constructor(private readonly _activatedRoute: ActivatedRoute) {}

	public ngOnInit(): void {
		this._activatedRoute.data.subscribe((data) => {
			console.log(data);
		});

		this._activatedRoute.params.subscribe((p) => {
			console.log(p);
		});
	}
}
