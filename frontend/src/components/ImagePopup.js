import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

function ImagePopup({ name, link, isOpen, onClose }) {
  return (
    <div
      className={cn("modal", "modal_for_photo", {
        "modal_opened": isOpen,
      })}
    >
      <div className="modal__content">
        <figure className="modal__full-photo-view">
          <img className="modal__full-photo" src={link} alt={name} />
          <figcaption className="modal__full-photo-caption">{name}</figcaption>
        </figure>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

ImagePopup.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagePopup;
