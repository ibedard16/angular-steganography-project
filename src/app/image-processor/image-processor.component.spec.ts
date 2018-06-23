/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageProcessorComponent } from './image-processor.component';

describe('ImageProcessorComponent', () => {
	let component: ImageProcessorComponent;
	let fixture: ComponentFixture<ImageProcessorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ImageProcessorComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageProcessorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
