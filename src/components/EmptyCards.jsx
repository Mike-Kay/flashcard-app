import { useGlobalContext } from "../context";

const EmptyCards = ({ text, desc, mastered }) => {
  const { toggleAllCards } = useGlobalContext();

  return (
    <div className="empty-cards">
      <div>
        <h1>{text}</h1>
        <p>{desc}</p>
        {!mastered && (
          <button type="button" className="btn" onClick={toggleAllCards}>
            Go to All Cards
          </button>
        )}
      </div>
    </div>
  );
};
export default EmptyCards;
