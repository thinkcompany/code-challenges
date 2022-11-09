import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

import FareCalculatorForm from '../components/Form';
import FormHeader from '../components/FormHeader';

describe('FormHeader', () => {
    configure({ adapter: new Adapter() });
    test('FormHeader renders an img with an id of "logo-png"', () => {
        const formHeader = shallow(
            <FormHeader title="Regional Rail Fares" />
        );

        expect(formHeader.contains('img#logo-png'));
    });

    test('FormHeader renders an h2 with the text "Regional Rail Fares"', () => {
        const formHeader = shallow(
            <FormHeader title="Regional Rail Fares" />
        );

        expect(formHeader.find('h2').text()).toEqual("Regional Rail Fares");
        expect(formHeader.find('h2').parent().is('header.flex-row')).toBe(true);
    });

    test(' is used by the FareCalculatorForm component', () => {
        const formWrapper = shallow(<FareCalculatorForm />);
        expect(formWrapper.find(FormHeader)).toHaveLength(1);
    })
});
