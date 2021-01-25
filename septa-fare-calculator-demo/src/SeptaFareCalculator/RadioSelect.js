import PropTypes from "prop-types";

const RadioSelect = ({ onChange, value, options, id, legend }) => {
  const renderOptions = (options) => {
    return options.map((option) => {
      return (
        <>
          <input
            value={option.value}
            checked={value === option.value}
            type="radio"
            name={option.text}
            id={option.text}
            onChange={(e) => onChange(e)}
          />
          <label for={option.text}>{option.text}</label>
        </>
      );
    });
  };
  return (
    <>
      <legend>{legend}</legend>
      <fieldset id={id}>{renderOptions(options)}</fieldset>
    </>
  );
};

RadioSelect.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  legend: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default RadioSelect;
