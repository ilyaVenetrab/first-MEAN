import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IReview } from './one-location/review/review.service';
import { BD_URL } from '../shared/tokens';

interface IOpeningTime {
	days: string;
	opening: string;
	closing: string;
	closed: boolean;
}

export interface ILocation {
	_id: string;
	name: string;
	address: string;
	rating: number;
	facilities: string[];
	openingTimes: IOpeningTime[];
	reviews: IReview[];
	distance: number[];
}

@Injectable({
	providedIn: 'root',
})
export class LocationsService {
	private _headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

	public constructor(@Inject(BD_URL) private readonly _bdUrl: string, private _http: HttpClient) {}

	// Error handling
	private _errorMgmt(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.error(errorMessage);
		return throwError(() => {
			return errorMessage;
		});
	}

	public getLocationsListByDistance(): Observable<ILocation[]> {
		return this._http.get(`${this._bdUrl}/locations?lng=-0.9690884&lat=51.455041`).pipe(
			map((res: Object) => {
				return res as ILocation[];
			}),
		);
	}

	public createLocations(data: any): Observable<any> {
		return this._http.post(`${this._bdUrl}/locations`, data).pipe(catchError(this._errorMgmt));
	}

	public getLocationsReadOne(id: any): Observable<any> {
		return this._http.get(`${this._bdUrl}/locations/${id}`, {
			headers: this._headers,
		});
	}

	public UpdateOneLocations(id: any, data: any): Observable<any> {
		return this._http.put(`${this._bdUrl}/locations/${id}`, data, {
			headers: this._headers,
		});
	}

	public deleteLocation(id: any): Observable<any> {
		return this._http.delete(`${this._bdUrl}/locations/${id}`, {
			headers: this._headers,
		});
	}
}
