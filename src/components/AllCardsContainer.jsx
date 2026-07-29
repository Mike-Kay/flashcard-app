import { useGlobalContext } from "../context";
import { CardForm, Allcards, AllCardsModal, EmptyCards } from "./index";

const AllCardsContainer = () => {
  const { isEditting, isDelete, cards } = useGlobalContext();

  const isModalDialog = isEditting || isDelete;

  const isEmptyCards = cards.length < 1;

  const formProps = {
    question: "",
    answer: "",
    category: "",
    toastMessage: "Card created successfully!",
    btnText: "create card",
    isModalForm: false,
  };

  return (
    <section className="allCards-section">
      <CardForm formProps={formProps} />
      {isEmptyCards ?
        <EmptyCards
          text="No cards yet"
          desc="Add your first card using the form above and it will show up here."
          mastered={true}
        />
      : <Allcards />}
      {isModalDialog && <AllCardsModal />}
    </section>
  );
};
export default AllCardsContainer;
