import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onDeleteConfirmation, cardId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteConfirmation(cardId);
  };

  return (
    <PopupWithForm
      name="confirm"
      formTitle="Вы уверены?"
      submitButtonTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

ConfirmDeletePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteConfirmation: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default ConfirmDeletePopup;
