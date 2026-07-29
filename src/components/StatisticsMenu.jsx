import statsTotalCardsIcon from "../assets/images/icon-stats-total.svg";
import statsMasteredCardsIcon from "../assets/images/icon-stats-mastered.svg";
import statsInProgressCardsIcon from "../assets/images/icon-stats-in-progress.svg";
import statsNotStartedCardsIcon from "../assets/images/icon-stats-not-started.svg";
import { useGlobalContext } from "../context";
import StatCard from "./StatCard";

const StatisticsMenu = () => {
  const { cards } = useGlobalContext();

  const masteredCards = cards.filter((card) => card.knownCount === 5);
  const cardsInProgress = cards.filter(
    (card) => card.knownCount > 0 && card.knownCount < 5,
  );
  const cardsNotStarted = cards.filter((card) => card.knownCount === 0);

  return (
    <article
      className="statistics-menu"
      role="region"
      tabIndex={0}
      aria-label="Study Statistics. This section displays the total number of cards, the number of mastered cards, the number of cards in progress, and the number of cards not started."
    >
      <header>
        <h2 aria-hidden="true">study statistics</h2>
      </header>
      <div className="statistics-container">
        <StatCard
          statText="total"
          statCount={cards.length}
          statIcon={statsTotalCardsIcon}
        />
        <StatCard
          statText="mastered"
          statCount={masteredCards.length}
          statIcon={statsMasteredCardsIcon}
        />
        <StatCard
          statText="in progress"
          statCount={cardsInProgress.length}
          statIcon={statsInProgressCardsIcon}
        />
        <StatCard
          statText="not started"
          statCount={cardsNotStarted.length}
          statIcon={statsNotStartedCardsIcon}
        />
      </div>
    </article>
  );
};
export default StatisticsMenu;
