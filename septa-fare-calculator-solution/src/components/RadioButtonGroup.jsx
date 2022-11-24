import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {humanize} from '../utils/formatString';

const StyledRadioButton = styled.input`
    height: 1.2rem;
    width: 1.2rem;
`;
const StyledRadioButtonLabel = styled.label`
    color: #595959;
    margin-left: .5rem;
`;
const StyledRadioButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-bottom: .2rem;
    font-size: 1.2rem;
`;
const StyledHelperText = styled.p`
    color: grey;
`;
const RadioButtonGroup = (props) => {
    const {info, hasHelperText, altHelperText, defaultValue, onChange} = props;

    const [selectedValue, setSelectedValue] = useState('');
    const [helperText, setHelperText] = useState('');

    const handleSelect = (e) => {
        const {value} = e.target;
        setSelectedValue(value);
        onChange(value);
    };

    /*
        Make sure that the default value is selected and passed to FareCalculator.
        When a default value is passed there is also alternate helper text passed to explain
        why the radio is selected by default
    */
    useEffect(() => {
        if (defaultValue) {
            setHelperText(altHelperText);
            setSelectedValue(defaultValue);
            onChange(defaultValue);
        } else {
            onChange(selectedValue);
            setHelperText(info[selectedValue]);
        }
    }, [defaultValue]);

    /*
        Since the alternate helper text is stored in the state we want to make sure that
        when we no longer are using the default value we set the helper text to the value
        of the selected purchase key
    */
    useEffect(() => {
        if (!defaultValue) {
            setHelperText(info[selectedValue]);
        }
    }, [selectedValue]);

    return (
        <>
            {Object.keys(info).map((key) => (
                key.includes('purchase') && (
                    <StyledRadioButtonGroup key={key}>
                        <StyledRadioButton
                            id={key}
                            type="radio"
                            value={key}
                            onChange={handleSelect}
                            checked={selectedValue === key}
                            disabled={defaultValue}
                        />
                        <StyledRadioButtonLabel htmlFor={key}>{humanize(key)}</StyledRadioButtonLabel>
                    </StyledRadioButtonGroup>
                )
            ))}
            {hasHelperText && helperText && <StyledHelperText>{helperText}</StyledHelperText>}
        </>
    );
};

export default RadioButtonGroup;
