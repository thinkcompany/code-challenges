const FareInput = (props) => {
    const { children, label, helperText } = props;

    return (
        <fieldset>
            <label>{label}</label>
            <div className="userInput">
                {children}
            </div>
            {helperText ? <p>{helperText}</p> : null}
        </fieldset>
    )
}
export default FareInput;
