import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageInputComponent } from './image-input/image-input.component';

@NgModule({
	declarations: [
		AppComponent,
		ImageInputComponent
	],
	imports: [
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
