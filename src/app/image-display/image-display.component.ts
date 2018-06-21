import { Component, OnChanges, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'steg-image-display',
	templateUrl: './image-display.component.html',
	styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnChanges {
	@Input() image: File;
	@ViewChild('image') imageRef: ElementRef;

	constructor(
		private renderer: Renderer,
	) {
	}

	ngOnChanges() {
		if (this.image != null) {
			this.parseImage().subscribe(image => {
				this.displayBase64Image(image);
			});
		} else {
			this.displayBase64Image('');
		}
	}

	private parseImage(): Observable<string> {
		return new Observable((observer) => {
			const fileReader = new FileReader();

			fileReader.onload = () => {
				observer.next(fileReader.result);
				observer.complete();
			};

			fileReader.readAsDataURL(this.image);
		});
	}

	private displayBase64Image(image: string) {
		this.renderer.setElementAttribute(this.imageRef.nativeElement, 'src', image);
	}
}
