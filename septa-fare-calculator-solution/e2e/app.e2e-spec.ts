import { SeptaFareCalculatorSolutionPage } from './app.po';

describe('septa-fare-calculator-solution App', () => {
  let page: SeptaFareCalculatorSolutionPage;

  beforeEach(() => {
    page = new SeptaFareCalculatorSolutionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('septa works!');
  });
});
