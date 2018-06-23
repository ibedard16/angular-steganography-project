import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'steg-image-processor',
	templateUrl: './image-processor.component.html',
	styleUrls: ['./image-processor.component.css']
})
export class ImageProcessorComponent implements OnChanges {
	@Input() image: HTMLImageElement;
	@Output() imageChange = new EventEmitter<HTMLImageElement>();
	@ViewChild('canvas') canvasRef: ElementRef;

	textboxControl: FormControl;

	private canvas: CanvasRenderingContext2D;
	constructor(
		formBuilder: FormBuilder,
		private renderer: Renderer
	) {
		this.textboxControl = formBuilder.control('');
	}

	ngAfterViewInit() {
		this.canvas = this.canvasRef.nativeElement.getContext('2d');
	}

	ngOnChanges() {
		if (this.image != null) {
			this.drawImageInCanvas();

			const maxMessageSize = this.image.height * this.image.width / 8;
			this.textboxControl.setValidators(Validators.maxLength(maxMessageSize));
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
		this.textboxControl.setValue(result);
	}

	encodeEncryptedImage() {
		if (this.textboxControl.invalid) {
			return;
		}

		let imageData = this.canvas.getImageData(0,0,this.canvasRef.nativeElement.width,this.canvasRef.nativeElement.width);
		let imageBytes = imageData.data;
		let currentImageByteIndex = 0;
		let messageToEncode = this.textboxControl.value + String.fromCharCode(0);
		for (let characterIndex = 0; characterIndex < messageToEncode.length; ++characterIndex) {
			const characterCode = messageToEncode.charCodeAt(characterIndex);
			if (characterCode > 127) {
				throw Error('Cannot encode character that is not ascii');
			}

			let characterInBinary: string = characterCode.toString(2);
			while (characterInBinary.length < 8) {
				characterInBinary = '0' + characterInBinary;
			}
			for (let messageBitIndex = 0; messageBitIndex < characterInBinary.length; ++messageBitIndex) {
				const messageBit = characterInBinary[messageBitIndex];
				const currentImageByte = imageBytes[currentImageByteIndex];

				let processedByte: number;
				if (messageBit === '1') {
					processedByte = this.setLastBitTo1(currentImageByte);
				} else if (messageBit === '0') {
					processedByte = this.setLastBitTo0(currentImageByte);
				} else {
					throw Error('Binary digit was not a 0 or a 1! Was: ' + messageBit);
				}

				imageBytes[currentImageByteIndex] = processedByte;
				currentImageByteIndex += 1;
				if ((currentImageByteIndex +1) % 4 === 0) {
					currentImageByteIndex += 1;
				}
			}
		}

		const newImageData = new ImageData(imageBytes, imageData.width, imageData.height);
		this.canvas.putImageData(newImageData, 0, 0);
	}

	private drawImageInCanvas() {
		this.canvasRef.nativeElement.width = this.image.width;
		this.canvasRef.nativeElement.height = this.image.height;
		this.canvas.drawImage(this.image,0,0);
	}

	private setLastBitTo1(byte: number) {
		if (byte % 2 === 1) {
			return byte;
		} else {
			return byte + 1;
		}
	}

	private setLastBitTo0(byte: number) {
		if (byte % 2 === 1) {
			return byte - 1;
		} else {
			return byte;
		}
	}
}
