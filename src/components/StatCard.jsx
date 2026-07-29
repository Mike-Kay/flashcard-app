const StatCard = ({ statText, statCount, statIcon }) => {
  return (
    <div
      className="stat-card"
      aria-label={`The number of ${statText} cards is ${statCount}.`}
    >
      <p>
        <span className="stat-text" aria-hidden="true">
          {`${statText} ${statText === "total" ? "cards" : ""}`}
        </span>
        <span className="stat-count" aria-hidden="true">
          {statCount}
        </span>
      </p>
      <div aria-hidden="true">
        <img src={statIcon} alt={`${statText} icon`} className="stat-icon" />
      </div>
    </div>
  );
};
export default StatCard;
