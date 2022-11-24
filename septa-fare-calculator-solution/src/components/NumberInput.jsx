import styled from 'styled-components';

const StyledNumberInput = styled.input`
    color: #595959;
    border: .1rem solid #C7C7C7;
    border-radius: .4rem;
    padding: 1rem 1rem;
    text-align: center;
    font-size: 1rem;
`;
const StyledHelperText = styled.p`
    color: grey;
`;
const NumberInput = (props) => {
    const {hasHelperText, helperText, label, onChange} = props;

    const handleInputChange = (e) => {
        const {value} = e.target;
        onChange(value);
    };

    return (
        <>
            <StyledNumberInput
                type="number"
                onChange={handleInputChange}
                aria-label={label}
            />
            {hasHelperText && <StyledHelperText>{helperText}</StyledHelperText>}
        </>
    );
};

export default NumberInput;
