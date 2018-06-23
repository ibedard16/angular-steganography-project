import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
	selector: 'steg-image-processor',
	templateUrl: './image-processor.component.html',
	styleUrls: ['./image-processor.component.css']
})
export class ImageProcessorComponent implements OnChanges {
	@Input() image: HTMLImageElement;
	@Output() imageChange = new EventEmitter<HTMLImageElement>();
	@ViewChild('canvas') canvasRef: ElementRef;

	textbox = '';

	private canvas: CanvasRenderingContext2D;
	constructor(
		private renderer: Renderer
	) {}

	ngAfterViewInit() {
		this.canvas = this.canvasRef.nativeElement.getContext('2d');
	}

	ngOnChanges() {
		if (this.image != null) {
			this.drawImageInCanvas();
		}
	}

	decodeEncryptedImage() {
		let imageBytes = this.canvas.getImageData(0,0,this.canvasRef.nativeElement.width,this.canvasRef.nativeElement.width).data;
		let result = '';
		let characterInBinary = '';
		for (let i = 0; i < imageBytes.length; ++i) {
			if ((i +1) % 4 === 0) {
				continue;
			}

			characterInBinary += imageBytes[i] % 2;
			if (characterInBinary.length === 8) {
				if (characterInBinary === '00000000') {
					// end of message
					break;
				}

				const character = String.fromCharCode(parseInt(characterInBinary, 2));
				result += character;
				characterInBinary = '';
			}
		}
		this.textbox = result;
	}

	private drawImageInCanvas() {
		this.canvasRef.nativeElement.width = this.image.width;
		this.canvasRef.nativeElement.height = this.image.height;
		this.canvas.drawImage(this.image,0,0);
	}
}
