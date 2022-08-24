import React from 'react';
import App from '../App';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import data from '../data/fares.json';

const renderApp = () => render(<App />);

let resultTotal,
    zoneId,
    type,
    purchase,
    trips,
    headerTitle,
    zonePrompt,
    typePrompt,
    typeHelper,
    purchasePrompt,
    tripsPrompt,
    resultPrompt;

afterEach(() => cleanup());

beforeEach(() => {
    let { getByTestId } = renderApp();
    headerTitle = getByTestId('header-title');
    zonePrompt = getByTestId('zone-section-prompt');
    typePrompt = getByTestId('type-section-prompt');
    typeHelper = getByTestId('type-section-helper');
    purchasePrompt = getByTestId('purchase-section-prompt');
    tripsPrompt = getByTestId('trips-section-prompt');
    resultPrompt = getByTestId('result-section-prompt');
    resultTotal = getByTestId('result-total');
    zoneId = getByTestId('zone-id');
    type = getByTestId('type');
    purchase = getByTestId('purchase');
    trips = getByTestId('trips');
})

test('fare calculator mounts', () => {
    expect(headerTitle).toHaveTextContent('Regional Rail Fares');
    expect(zonePrompt).toHaveTextContent('Where are you going?');
    expect(typePrompt).toHaveTextContent('When are you riding?');
    expect(purchasePrompt).toHaveTextContent('Where will you purchase the fare?');
    expect(tripsPrompt).toHaveTextContent('How many rides will you need?');
    expect(resultPrompt).toHaveTextContent('Your fare will cost');
    expect(zoneId).toHaveValue('1');
    expect(type).toHaveValue('weekday');
    expect(typeHelper).toHaveTextContent(data.info.weekday);
    expect(purchase).toHaveValue('advance_purchase');
    expect(trips).toHaveValue('1');
    expect(resultTotal).toHaveTextContent('$' + data.zones[0].fares[0].price);
});
