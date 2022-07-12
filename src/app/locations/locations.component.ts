import { Component } from '@angular/core';
import { LocationsService, ILocation } from './locations.service';

@Component({
	selector: 'app-locations-list',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent {
	public message: string | null = null;

	public locations: ILocation[] | null = [];

	public constructor(private _appService: LocationsService) {
		this._appService.getLocationsListByDistance().subscribe((data: ILocation[]) => {
			this.locations = data;
		});
	}
}
