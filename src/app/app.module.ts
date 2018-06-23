import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { ImageProcessorComponent } from './image-processor/image-processor.component';

@NgModule({
	declarations: [
		AppComponent,
		ImageInputComponent,
		ImageProcessorComponent
	],
	imports: [
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
