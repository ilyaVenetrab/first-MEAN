import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface IOpeningTime {
	days: string;
	opening: string;
	closing: string;
	closed: boolean;
}

interface IReview {
	rating: number;
	_id: string;
	author: string;
	reviewText: string;
	timestamp: number;
}

export interface ILocation {
	_id: string;
	name: string;
	address: string;
	rating: number;
	facilities: string[];
	openingTimes: IOpeningTime[];
	reviews: IReview[];
	coords: number[];
}

@Injectable({
	providedIn: 'root',
})
export class LocationsService {
	private _baseURL: string = 'http://localhost:4000/api';

	private _headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

	public constructor(private _http: HttpClient) {
		if (process.env['NODE_ENV'] === 'production') {
			this._baseURL = 'https://safe-journey-56345.herokuapp.com';
		}
	}

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
		return this._http.get(`${this._baseURL}/locations?lng=-0.9690884&lat=51.455041`).pipe(
			map((res: Object) => {
				return res as ILocation[];
			}),
		);
	}

	public createLocations(data: any): Observable<any> {
		return this._http.post(`${this._baseURL}/locations`, data).pipe(catchError(this._errorMgmt));
	}

	public getLocationsReadOne(id: any): Observable<any> {
		return this._http.get(`${this._baseURL}/locations/${id}`, {
			headers: this._headers,
		});
	}

	public UpdateOneLocations(id: any, data: any): Observable<any> {
		return this._http.put(`${this._baseURL}/locations/${id}`, data, {
			headers: this._headers,
		});
	}

	public deleteLocation(id: any): Observable<any> {
		return this._http.delete(`${this._baseURL}/locations/${id}`, {
			headers: this._headers,
		});
	}
}
