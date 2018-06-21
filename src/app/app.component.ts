import { Component } from '@angular/core';

@Component({
	selector: 'steg-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	image: File;

	imageChange(image: File) {
		this.image = image;
	}
}
