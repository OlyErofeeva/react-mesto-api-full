import React from "react";
import PropTypes from "prop-types";
import useValidatedState from "../utils/useValidatedState";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState("Создать");

  const {
    inputState: captionInput,
    onChange: onCaptionInputChange,
    reset: resetCaptionInput
  } = useValidatedState("");
  
  const {
    inputState: linkInput,
    onChange: onLinkInputChange,
    reset: resetLinkInput
  } = useValidatedState("");


  const clearInputs = () => {
    resetCaptionInput("");
    resetLinkInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle("Сохранение...");
    onAddPlace({
      name: captionInput.value,
      link: linkInput.value,
    }).finally(() => {
      setSubmitButtonTitle("Создать");
      clearInputs();
    });
  };

  const handleClose = () => {
    onClose();
    clearInputs();
  };

  return (
    <PopupWithForm
      name="place"
      formTitle="Новое место"
      submitButtonTitle={submitButtonTitle}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!captionInput.isValid || !linkInput.isValid}
    >
      <input
        className="form__input form__input_theme_light"
        type="text"
        name="newPlaceCaption"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={captionInput.value}
        onChange={onCaptionInputChange}
      />
      <span className="form__error" id="newPlaceCaption-error">
        {captionInput.errorMessage}
      </span>

      <input
        className="form__input form__input_theme_light"
        type="url"
        name="newPlaceLink"
        placeholder="Ссылка на картинку"
        required
        value={linkInput.value}
        onChange={onLinkInputChange}
      />
      <span className="form__error" id="newPlaceLink-error">
        {linkInput.errorMessage}
      </span>
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
};

export default AddPlacePopup;
