import { Component, Input } from '@angular/core';
import { IPageHeader } from '../app.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Input()
	public pageHeader: IPageHeader = {} as IPageHeader;
}
