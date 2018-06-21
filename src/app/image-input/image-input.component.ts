import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'steg-image-input',
	templateUrl: './image-input.component.html',
	styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
	@Input() image: File;
	@Output() imageChange = new EventEmitter<File>();

	selectImage(event) {
		this.image = event.srcElement.files[0];
		this.imageChange.next(this.image);
	}
}
