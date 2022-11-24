import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from './Header';
import Dropdown from './Dropdown';
import RadioButtonGroup from './RadioButtonGroup';
import NumberInput from './NumberInput';
import CalculatedTotal from './CalculatedTotal';

const StyledSection = styled.div`
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    border-bottom: .05rem solid #C7C7C7;
`;
const StyledSectionTitle = styled.h2`
    color: #595959;
`;
const StyledFareCalculator = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: .2rem solid grey;
`;
const FareCalculator = () => {
    const [fareData, setFareData] = useState({});
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [isCommuterPass, setCommuterPass] = useState(false);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json')
            .then((response) => response.json())
            .then((data) => {
                setFareData(data);
                setLoading(false);
            });
    }, []);

    /*
        The program flow is dependent on whether or not fare type is 'anytime' where 'anytime' will
        indicate to the app that we want to follow the isCommuterPass path
    */
    useEffect(() => {      
        if (values.type && values.type === 'anytime') {
            setCommuterPass(true);
        } else {
            setCommuterPass(false);
        }
    }, [values]);

    useEffect(() => {      
        if (Object.keys(values).length === 4) {
            calculateTotal(values);
        }
    }, [values, isCommuterPass]);

    const calculateTotal = (values) => {
        let fare;

        const zone = fareData.zones.find((zone) => zone.zone === Number(values.zone));
        
        if (!isCommuterPass) {
            fare = zone.fares.find((fares) => (fares.type === values.type && fares.purchase === values.purchase));
        } else {
            fare = zone.fares.find((fares) => (fares.type === values.type));
        }

        const price = fare.price;
        const total = price * values.trips;

        setTotalCost(total);
    };

    const handleChange = (key) => (value) => {
        if (value.length > 0) {
            setValues(values => ({
                ...values,
                [key]: value
            }));
        }
    };

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <StyledFareCalculator>
            <Header title={'Regional Rail Fares'} />
            <StyledSection>
                <StyledSectionTitle>Where are you going?</StyledSectionTitle>
                <Dropdown
                    zones={fareData.zones}
                    hasHelperText={false}
                    onChange={handleChange('zone')}
                />
            </StyledSection>
            <StyledSection>
                <StyledSectionTitle>When are you riding?</StyledSectionTitle>
                <Dropdown
                    info={fareData.info}
                    hasHelperText={true}
                    onChange={handleChange('type')}
                    omitOption={'purchase'}
                />
            </StyledSection>
            <StyledSection>
                <StyledSectionTitle>Where will you purchase the fare?</StyledSectionTitle>
                {/*
                    When fare type is anytime there is only the option to purchase in advanced
                    so we set the selected value as 'advance_purchase' and pass helper text to
                    explain why there is a default radio checked
                */}
                <RadioButtonGroup
                    info={fareData.info}
                    hasHelperText={true}
                    onChange={handleChange('purchase')}
                    defaultValue={isCommuterPass && 'advance_purchase'}
                    altHelperText={isCommuterPass && 'Commuter Passes may only be purchased in advanced'}
                />
            </StyledSection>
            <StyledSection>
                {
                    isCommuterPass ? (
                        <StyledSectionTitle>How many Commuter Passes will you need?</StyledSectionTitle>
                    ) : <StyledSectionTitle>How many rides will you need?</StyledSectionTitle>
                }
                <NumberInput
                    onChange={handleChange('trips')}
                    hasHelperText={isCommuterPass}
                    helperText={'Commuter Passes valid for up to 10 trips'}
                    label={'number of trips'}
                />
            </StyledSection>
            <CalculatedTotal
                title={isCommuterPass ? 'You Commuter Pass will cost' : 'Your fare will cost'}
                result={totalCost}
            />
        </StyledFareCalculator>
    );
};

export default FareCalculator;
