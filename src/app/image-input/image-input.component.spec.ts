/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputComponent } from './image-input.component';

describe('StegImageInputComponent', () => {
	let component: ImageInputComponent;
	let fixture: ComponentFixture<ImageInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ImageInputComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
