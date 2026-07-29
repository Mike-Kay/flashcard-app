import { AllCardsContainer, Navbar, StudyModeContainer } from "./components";
import { useGlobalContext } from "./context";

const App = () => {
  const { isCardStudyMode } = useGlobalContext();

  return (
    <>
      <header className="centered">
        <Navbar />
      </header>
      <main className="centered">
        {isCardStudyMode ?
          <StudyModeContainer />
        : <AllCardsContainer />}
      </main>
    </>
  );
};
export default App;
