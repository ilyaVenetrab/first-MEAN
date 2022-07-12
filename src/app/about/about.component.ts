import { Component } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
	public title: string = 'About';

	public content: string =
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ea eaque, ex fuga minus, natus nisi perferendis porro quasi quis sit sunt voluptatem voluptates. Hic ipsum quam sit soluta suscipit!';
}
