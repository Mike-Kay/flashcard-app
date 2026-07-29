import { useState } from "react";
import logo from "../assets/images/logo-small.svg";
import { useGlobalContext } from "../context";
import SrAnnoucement from "./SrAnnouncement";

const Navbar = () => {
  const { isCardStudyMode, toggleStudyMode, toggleAllCards } =
    useGlobalContext();

  const [announcement, setAnnouncement] = useState("");

  return (
    <nav className="navbar">
      <figure className="logo" aria-label="flashcard logo">
        <img src={logo} alt="A flashcard app logo." aria-hidden="true" />
        <figcaption>Flashcard</figcaption>
      </figure>

      <div className="nav-btn-container">
        <button
          type="button"
          className={`btn nav-btn ${isCardStudyMode ? "navBtn-active" : ""}`}
          onClick={() => {
            toggleStudyMode();
            setAnnouncement("You're in the Study Mode Section.");
            setTimeout(() => setAnnouncement(""), 1000);
          }}
        >
          study mode
        </button>

        <button
          type="button"
          className={`btn nav-btn ${isCardStudyMode ? "" : "navBtn-active"}`}
          onClick={() => {
            toggleAllCards();
            setAnnouncement("You're in the All Cards Section.");
            setTimeout(() => setAnnouncement(""), 1000);
          }}
        >
          all cards
        </button>
      </div>

      <SrAnnoucement announcement={announcement} />
    </nav>
  );
};
export default Navbar;
