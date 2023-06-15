export const Input = ({
  buttonsList,
  onChange,
  title,
  checked,
  isTypeRadio = false,
  inputValue,
  descriptionText,
  singeTicketPurchase,
}) => {
  return (
    <div className="input-field-wrapper border">
      <h3>{title}</h3>
      {isTypeRadio ? (
        <div className="radio-selection">
          {buttonsList.map((button) => {
            return (
              <div key={button.title}>
                <input
                  type="radio"
                  label={button.title}
                  name={button.title}
                  value={button.value}
                  checked={checked === button.value}
                  onChange={onChange}
                  aria-label={button.title}
                />
                {button.title}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="box-with-description">
          <input
            type="number"
            step={singeTicketPurchase ? 1 : 10}
            value={inputValue}
            onChange={onChange}
            aria-label="Chose number of rides"
          />
          {descriptionText ? (
            <span className="info-text"> {descriptionText} </span>
          ) : null}
        </div>
      )}
    </div>
  );
};
