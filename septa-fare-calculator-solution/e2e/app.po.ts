import { browser, element, by } from 'protractor';

export class SeptaFareCalculatorSolutionPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('septa-root h1')).getText();
  }
}
