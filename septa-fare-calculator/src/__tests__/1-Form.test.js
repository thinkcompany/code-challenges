import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

import App from '../App';
import FareCalculatorForm from '../components/Form';

describe('Form', () => {
    configure({ adapter: new Adapter() });
    test('FareCalculatorForm renders a div with an id of "main-form"', () => {
        const form = shallow(
            <FareCalculatorForm />
        );

        expect(form.is('div#main-form')).toBe(true);
    });

    test('FareCalculatorForm is used by the App component', () => {
        const appWrapper = shallow(<App />);
        expect(appWrapper.find(FareCalculatorForm)).toHaveLength(1);
    })
});
