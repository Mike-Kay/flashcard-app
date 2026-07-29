import checkIcon from "../assets/images/icon-check.svg";
import { useGlobalContext } from "../context";

const CustomCheckbox = ({ labelID, label, count }) => {
  const {
    currCards,
    isHideMastered,
    hideMastered,
    filteredCategories,
    checkboxFilter,
  } = useGlobalContext();

  const isChecked = () => {
    if (labelID === "mastered") return isHideMastered;

    return filteredCategories.includes(labelID);
  };

  const handleCheckboxChange = () => {
    if (labelID === "mastered") {
      hideMastered(currCards);
      return;
    }
    checkboxFilter(labelID);
  };

  return (
    <div>
      <label className={`check-label ${isChecked() ? "show" : ""}`}>
        <input
          type="checkbox"
          name={labelID}
          id={labelID}
          className="check-input"
          checked={isChecked()}
          onChange={handleCheckboxChange}
          aria-label={
            labelID !== "mastered" ?
              `${labelID} category, has ${count} card${count > 1 ? "s" : ""}.`
            : "Hide mastered flashcards."
          }
        />
        <img
          src={checkIcon}
          alt="check icon"
          className="check-icon"
          aria-hidden={true}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default CustomCheckbox;
