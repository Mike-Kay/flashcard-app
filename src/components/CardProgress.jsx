import masteredIcon from "../assets/images/icon-mastered.svg";

const CardProgress = ({ knownCount }) => {
  if (knownCount === 5) {
    return (
      <div
        className="mastered-card-tag"
        aria-label="Card progress is: 5 out of 5, you have mastered this card."
      >
        <img
          src={masteredIcon}
          alt="Mastered question icon"
          aria-hidden={true}
        />
        <span aria-hidden={true}>Mastered</span>
        <span aria-hidden={true}>5/5</span>
      </div>
    );
  }
  return (
    <div
      className="card-progress-tag"
      aria-label={`Card progress is: ${knownCount} out 5.`}
    >
      <progress
        className="progress-bar"
        min="0"
        value={knownCount}
        max="5"
        aria-hidden={true}
      ></progress>
      <span aria-hidden="true">{knownCount}/5</span>
    </div>
  );
};
export default CardProgress;
