import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BD_URL } from '../../../shared/tokens';

export interface IReview {
	rating: number;
	_id: string;
	author: string;
	reviewText: string;
	timestamp: number;
}

@Injectable({
	providedIn: 'root',
})
export class ReviewService {
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

	public createReview(id: number, data: any) {
		this._http
			.post(`${this._bdUrl}/locations/${id}/reviews`, data)
			.pipe(catchError(this._errorMgmt));
	}
}
