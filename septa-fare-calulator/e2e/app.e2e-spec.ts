import { SeptaFareCalulatorPage } from './app.po';

describe('septa-fare-calulator App', () => {
  let page: SeptaFareCalulatorPage;

  beforeEach(() => {
    page = new SeptaFareCalulatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
