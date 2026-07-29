import { useEffect, useState } from "react";
import dropdownIcon from "../assets/images/icon-chevron-down.svg";
import shuffleIcon from "../assets/images/icon-shuffle.svg";
import { useGlobalContext } from "../context";
import { CustomCheckbox, SrAnnouncement } from "./index";
import checkIcon from "../assets/images/icon-check.svg";
import { useFocusTrap } from "../utils";

const FlashcardHeader = () => {
  const {
    cards,
    categories,
    shuffleCards,
    filteredCategories,
    toggleAllCategories,
  } = useGlobalContext();

  const [isShowCategory, setIsShowCategory] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const submenuContainer = useFocusTrap({
    isOpen: isShowCategory,
    isDropdown: true,
  });

  useEffect(() => {
    const handleKeydown = (e) => {
      const categoryBtn = document.querySelector(".categories-btn");

      if (e.key === "Escape" && isShowCategory) {
        categoryBtn.focus();
        setIsShowCategory(false);
      }

      categoryBtn.setAttribute("aria-expanded", "false");
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isShowCategory]);

  const toggleAll =
    Object.keys(categories).length === filteredCategories.length;

  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;
    const { left, right, bottom, top } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event;

    if (
      clientX < left ||
      clientX > right - 1 ||
      clientY > bottom - 5 ||
      clientY < top
    ) {
      setIsShowCategory(false);
    }
  };

  return (
    <header
      className={`flashcard-header ${isShowCategory ? "show-categories" : ""}`}
    >
      <div>
        <div className="categories-container">
          <button
            type="button"
            className="categories-btn btn"
            onClick={() => setIsShowCategory(!isShowCategory)}
            aria-haspopup="menu"
            aria-expanded={isShowCategory ? "true" : "false"}
          >
            <span>all categories</span>
            <img
              src={dropdownIcon}
              alt="categories dropdown icon"
              aria-hidden={true}
            />
          </button>

          {/* category dropdown */}
          <aside
            className="categories-dropdown"
            ref={submenuContainer}
            onMouseLeave={handleMouseLeave}
          >
            <div className="categories">
              <div>
                <label className={`check-label ${toggleAll ? "show" : ""}`}>
                  <input
                    type="checkbox"
                    className="check-input"
                    name="all"
                    id="all"
                    checked={toggleAll ? true : false}
                    onChange={() => toggleAllCategories(toggleAll)}
                    aria-label={`All categories, has ${cards.length} card${cards.length > 1 ? "s" : ""}.`}
                    tabIndex={0}
                  />
                  <img
                    src={checkIcon}
                    alt="check icon"
                    className="check-icon"
                    aria-hidden={true}
                  />
                  <span>all ({cards.length})</span>
                </label>
              </div>
              {Object.entries(categories)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([category, count]) => {
                  return (
                    <CustomCheckbox
                      key={category}
                      label={`${category} (${count})`}
                      labelID={category}
                      count={count}
                    />
                  );
                })}
            </div>
          </aside>
        </div>

        <div>
          <CustomCheckbox label="hide mastered" labelID="mastered" />
        </div>
      </div>

      <button
        type="button"
        className="btn shuffle-btn"
        onClick={() => {
          shuffleCards();
          setAnnouncement("Cards shuffled successfully!");
          setTimeout(() => setAnnouncement(""), 500);
        }}
      >
        <img
          src={shuffleIcon}
          alt="flashcard shuffle icon"
          aria-hidden={true}
        />
        <span>shuffle</span>
        <SrAnnouncement announcement={announcement} />
      </button>
    </header>
  );
};
export default FlashcardHeader;
