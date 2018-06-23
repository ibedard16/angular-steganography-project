import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'steg-image-input',
	templateUrl: './image-input.component.html',
	styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
	@Input() image: HTMLImageElement;
	@Output() imageChange = new EventEmitter<HTMLImageElement>();

	selectImage(event) {
		const imageFile = event.srcElement.files[0];
		this.parseImageFileToDataUrl(imageFile).subscribe(imageDataUrl => {
			this.parseImageUrlToImage(imageDataUrl).subscribe(image => {
				this.image = image;
				this.imageChange.emit(image);
			});
		});
	}

	private parseImageFileToDataUrl(imageFile: File): Observable<string> { 
		return new Observable((observer) => { 
			const fileReader = new FileReader(); 

			fileReader.onload = () => { 
				observer.next(fileReader.result); 
				observer.complete(); 
			}; 
		
			fileReader.readAsDataURL(imageFile); 
		}); 
	}

	private parseImageUrlToImage(imageUrl: string): Observable<HTMLImageElement> {
		return new Observable((observer) => { 
			const image = new Image();

			image.src = imageUrl;

			image.onload = () => {
				observer.next(image);
				observer.complete();
			}
		}); 
	}
}
