import { browser, element, by } from 'protractor';

export class SteganographyPage {
	navigateTo() {
		return browser.get('/');
	}

	getParagraphText() {
		return element(by.css('steg-root h1')).getText();
	}
}
