import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ILocation, LocationsService } from '../locations.service';

@Injectable({
	providedIn: 'root',
})
export class OneLocationResolver implements Resolve<ILocation | null> {
	public constructor(
		private readonly _router: Router,
		private readonly _locationsService: LocationsService,
	) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<ILocation | null> {
		console.log(route.params['locationId']);
		return this._locationsService.getLocationsReadOne(route.params['locationId']).pipe(
			map((location: ILocation | null) => {
				if (!location) {
					this._router.navigate(['locations']);
				}
				return location;
			}),
			catchError(() => {
				this._router.navigate(['locations']);
				return of(null);
			}),
		);
	}
}
