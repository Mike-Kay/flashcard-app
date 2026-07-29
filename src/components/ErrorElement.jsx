import errorIcon from "../assets/images/icon-error.svg";

const ErrorElement = ({ errorText, errorID }) => {
  return (
    <p id={errorID} className="error" aria-live="polite">
      <img
        src={errorIcon}
        alt="error icon"
        className="error-icon-img"
        aria-hidden="true"
      />
      <span>Please enter {errorText}.</span>
    </p>
  );
};
export default ErrorElement;
