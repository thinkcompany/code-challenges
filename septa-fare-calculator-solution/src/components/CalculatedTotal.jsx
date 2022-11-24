import styled from 'styled-components';

const StyledCalculatedTotal = styled.div`
    background-color:#595959;
    color: white;
    padding: 2rem;
`;
const StyledCalculatorTotalTitle = styled.h2`
    margin: 0rem;
`;
const StyledResult = styled.h1`
    margin: 0rem;
    font-size: 5rem;
`;
const CalculatedTotal = (props) => {
    const {title, result} = props;
    return(
        <>
            <StyledCalculatedTotal>
                <StyledCalculatorTotalTitle>{title}</StyledCalculatorTotalTitle>
                <StyledResult>{result.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</StyledResult>
            </StyledCalculatedTotal>
        </>
    );
};

export default CalculatedTotal;
