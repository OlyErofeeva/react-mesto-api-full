import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  likes,
  owner,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = owner._id === currentUser._id;
  const isLiked = likes.some((like) => like._id === currentUser._id);

  const cardClickHandler = () => {
    onCardClick({ name, link });
  };

  const cardLikeHandler = () => {
    onCardLike(likes, _id);
  };

  const cardDeleteHandler = () => {
    onCardDelete(_id);
  };

  return (
    <li className="card">
      <div className="card__photo-container">
        <img
          className="card__photo"
          src={link}
          alt={name}
          onClick={cardClickHandler}
        />
      </div>
      <div className="card__info">
        <h2 className="card__caption">{name}</h2>
        <div className="card__like-container">
          <button
            className={cn("card__like-button", {
              "card__like-button_active": isLiked
            })}
            type="button"
            onClick={cardLikeHandler}
          ></button>
          <p className="card__likes">{likes.length}</p>
        </div>
      </div>
      <button
        className={cn("card__delete-button", {
          "card__delete-button_hidden": !isOwner,
        })}
        type="button"
        onClick={cardDeleteHandler}
      ></button>
    </li>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

export default Card;
