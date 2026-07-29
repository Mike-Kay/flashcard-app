import closeIcon from "../assets/images/icon-cross.svg";

const Toast = ({ message = "Toast message", removeToast }) => {
  return (
    <div className="toast" role="alert">
      <p>{message}</p>
      <button type="button" className="close-toast-btn" onClick={removeToast}>
        <img src={closeIcon} alt="close icon" aria-hidden="true" />
      </button>
    </div>
  );
};
export default Toast;
