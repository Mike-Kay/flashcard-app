import xIcon from "../assets/images/icon-cross.svg";
import { useGlobalContext } from "../context";
import CardForm from "./CardForm";
import { useFocusTrap } from "../utils";
import { useEffect } from "react";

const AllCardsModal = () => {
  const {
    cardToEdit,
    isEditting,
    isDelete,
    closeModal,
    deleteCard,
    showToast,
  } = useGlobalContext();

  const { id, question, answer, category } = cardToEdit;

  const formProps = {
    question,
    answer,
    category,
    toastMessage: "Card updated successfully!",
    btnText: "update card",
    isModalForm: true,
  };

  const isModalOpen = isEditting || isDelete;

  const modalRef = useFocusTrap({
    isOpen: isModalOpen,
    isEditting,
    isDelete,
    isDropdown: false,
    isCardDropdown: false,
    closeModal,
    id,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      if (
        e.key === "Enter" &&
        isDelete &&
        !activeElement.classList.contains("btn-cancel")
      ) {
        e.preventDefault();
        deleteCard(cardToEdit);
        showToast("Card deleted.");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef} role="dialog" aria-modal="true">
        {isEditting && (
          <div tabIndex={0} className="edit-dialog">
            <header className="modal-header modal-edit-header">
              <h2>Edit your card</h2>
              <button
                type="button"
                onClick={closeModal}
                className="btn"
                aria-label="Cancel card edit."
              >
                <img
                  src={xIcon}
                  alt="close modal"
                  className="img"
                  aria-hidden="true"
                />
              </button>
            </header>
            <CardForm formProps={formProps} />
          </div>
        )}
        {isDelete && (
          <div tabIndex={0}>
            <header className="modal-header modal-delete-header">
              <h2>Delete this card?</h2>
              <p>This action can't be undone.</p>
            </header>
            <div className="modal-btn-container">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={closeModal}
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-yellow"
                onClick={() => {
                  deleteCard(cardToEdit);
                  showToast("Card deleted.");
                }}
              >
                delete card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AllCardsModal;
