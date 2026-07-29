import { useEffect, useRef, useState } from "react";
import menuIcon from "../assets/images/icon-menu.svg";
import editIcon from "../assets/images/icon-edit.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import { CardProgress, SrAnnouncement } from "./index";
import { useGlobalContext } from "../context";
import { useFocusTrap } from "../utils";

const SingleCard = ({ id, question, answer, category, knownCount, index }) => {
  const { openDeleteModal, openEditModal } = useGlobalContext();

  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const singleCardContainerRef = useRef(null);
  const cardDropdownContainer = useFocusTrap({
    isOpen: showCardDropdown,
    isCardDropdown: true,
  });

  useEffect(() => {
    const handleKeydown = (e) => {
      const editIconBtn = document.querySelector(".edit-icon-btn");

      if (e.key === "Escape" && showCardDropdown) {
        setShowCardDropdown(false);
        editIconBtn.focus();
      }
      editIconBtn.setAttribute("aria-expanded", "false");
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [showCardDropdown]);

  return (
    <div
      className="single-card"
      data-id={id}
      onMouseLeave={() => setShowCardDropdown(false)}
      key={id}
      tabIndex={0}
      ref={singleCardContainerRef}
      onBlur={(e) =>
        !singleCardContainerRef.current.contains(e.relatedTarget) &&
        setShowCardDropdown(false)
      }
    >
      <span className="sr-only">Flashcard {index + 1}.</span>
      <h1 aria-label={`Flashcard question is: ${question}.`}>{question}?</h1>

      <p>
        <span className="sr-only">Flashcard answer is: {answer}.</span>
        <span aria-hidden="true">Answer:</span>
        <span aria-hidden="true">{answer}</span>
      </p>

      <div>
        <div className="category-tag-container">
          <div
            className="category-tag"
            aria-label={`Flashcard category is: ${category}.`}
          >
            <span aria-hidden="true">{category}</span>
          </div>
        </div>

        <div className="card-progress-container">
          <CardProgress knownCount={knownCount} />
        </div>

        <div className="edit-icon-container">
          <button
            type="button"
            className="edit-icon-btn btn"
            data-id={id}
            onClick={() => setShowCardDropdown(!showCardDropdown)}
            aria-haspopup="menu"
            aria-expanded={showCardDropdown ? "true" : "false"}
            aria-label={`Flashcard ${index + 1} open edit-delete submenu button.`}
          >
            <img
              src={menuIcon}
              alt="edit icon"
              className="edit-icon"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/*card dropdown menu  */}
      <aside
        className={
          showCardDropdown ? "card-dropdown-menu show" : "card-dropdown-menu"
        }
        data-id={id}
        ref={cardDropdownContainer}
        role="menu"
        aria-label={`Flashcard ${index + 1} edit-delete submenu.`}
      >
        <div>
          <button
            type="button"
            className="card-dropdown-menu-btn edit-btn nbtn"
            data-id={id}
            onClick={() => {
              openEditModal(id);
              setAnnouncement("The edit modal is opened.");
              setTimeout(() => setAnnouncement(""), 100);
            }}
          >
            <img
              src={editIcon}
              alt="edit-icon"
              className="card-dropdown-menu-icon"
              aria-hidden="true"
            />
            <span>Edit</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="card-dropdown-menu-btn delete-btn nbtn"
            data-id={id}
            onClick={(e) => {
              openDeleteModal(id);
              setAnnouncement("The delete modal is opened.");
              setTimeout(() => setAnnouncement(""), 100);
            }}
          >
            <img
              src={deleteIcon}
              alt="delete icon"
              className="card-dropdown-menu-icon"
              aria-hidden="true"
            />
            <span>Delete</span>
          </button>
        </div>
      </aside>

      <SrAnnouncement announcement={announcement} />
    </div>
  );
};
export default SingleCard;
