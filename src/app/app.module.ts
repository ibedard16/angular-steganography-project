import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { ImageDisplayComponent } from './image-display/image-display.component';

@NgModule({
	declarations: [
		AppComponent,
		ImageInputComponent,
		ImageDisplayComponent
	],
	imports: [
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
