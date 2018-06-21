import { SteganographyPage } from './app.po';

describe('steganography App', function() {
	let page: SteganographyPage;

	beforeEach(() => {
		page = new SteganographyPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
