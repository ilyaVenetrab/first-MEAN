import { Component } from '@angular/core';

export interface IPageHeader {
	title: string;
	subTitle: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public pageHeader: IPageHeader = {
		title: 'MEAN',
		subTitle: 'Find places to work with wifi near you!',
	};
}
