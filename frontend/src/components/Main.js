import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile page__profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
          </div>
          <div className="profile__flex-column">
            <div className="profile__flex-row">
              <h1 className="profile__full-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__bio">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="cards-container">
          {cards.map((item) => (
            <Card
              {...item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  onEditProfile: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Main;
