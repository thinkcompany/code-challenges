export const Select = ({ title, options, descriptionText, onChange }) => {
  return (
    <div className="select-wrapper border">
      <h3>{title}</h3>
      <div className="description-box">
        <select
          name="Purchase location"
          className="select"
          onChange={onChange}
          aria-label="Purchase location"
        >
          {options.map((option) => (
            <option
              value={option.value}
              key={option.value}
              label={option.title}
            >
              {option.title}
            </option>
          ))}
        </select>
        {descriptionText ? (
          <span className="info-text"> {descriptionText}</span>
        ) : null}
      </div>
    </div>
  );
};
