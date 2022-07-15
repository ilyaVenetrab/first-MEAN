import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
	@Input()
	public locationRating: number = 0;

	public ratingFull(currentRating: number): string[] {
		let ratingClass: string[] = [];

		for (let i = 0; i < 5; i++) {
			if (i < currentRating) {
				ratingClass.push('star');
			} else {
				ratingClass.push('star_outline');
			}
		}

		return ratingClass;
	}
}
