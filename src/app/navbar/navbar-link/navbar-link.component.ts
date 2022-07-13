import { Component, EventEmitter, Output } from '@angular/core';

interface ILink {
	title: string;
	url: string;
}

@Component({
	selector: 'app-navbar-link',
	templateUrl: './navbar-link.component.html',
	styleUrls: ['./navbar-link.component.scss'],
})
export class NavbarLinkComponent {
	@Output()
	public toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	public links: ILink[] = [
		{
			title: 'Locations',
			url: 'locations',
		},
		{
			title: 'About',
			url: 'about',
		},
	];

	public clickEvent(): void {
		this.toggleEvent.emit();
	}
}
