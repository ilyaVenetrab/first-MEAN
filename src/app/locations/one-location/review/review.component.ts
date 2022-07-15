import { Component, Input } from '@angular/core';
import { ModalService } from '../../../modal/modal.service';
import { IReview } from './review.service';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
	@Input()
	public reviews: IReview[] = [];

	public constructor(private _modalService: ModalService) {}

	public async addReview(): Promise<any> {
		const m = await import('./review-form/review-form.component');
		this._modalService.open({
			component: m.ReviewFormComponent,
			context: {
				add: () => {
					console.log('add to card');
					this._modalService.close();
				},
				close: () => {
					console.log('close');
					this._modalService.close();
				},
			},
		});
	}
}
