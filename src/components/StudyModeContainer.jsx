import { FlashCardMenu, StatisticsMenu } from "./index";

const StudyModeContainer = () => {
  return (
    <section className="study-mode-container" aria-label="Study Mode Section.">
      <FlashCardMenu />
      <StatisticsMenu />
    </section>
  );
};
export default StudyModeContainer;
