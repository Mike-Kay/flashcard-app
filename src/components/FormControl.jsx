import ErrorElement from "./ErrorElement";

const FormControl = ({
  label,
  value,
  placeholderText,
  handleChange,
  errorText,
  errorCheck,
  errorID,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={label} className="form-label" aria-hidden="true">
        {label}
      </label>
      <input
        type="text"
        name={label}
        id={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholderText}
        aria-label={`${label} input field.`}
        aria-required="true"
        aria-invalid={errorCheck ? true : false}
        aria-describedby={errorCheck ? errorID : undefined}
      />
      <ErrorElement errorText={errorText} errorID={errorID} />
    </div>
  );
};
export default FormControl;
