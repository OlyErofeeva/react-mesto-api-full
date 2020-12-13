import React from "react";
import PropTypes from "prop-types";
import useValidatedState from "../utils/useValidatedState";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState("Сохранить");
  
  const {
    inputState: avatarInput,
    onChange: onAvatarInputChange,
    reset: resetAvatarInput,
  } = useValidatedState("");


  const clearInputs = () => {
    resetAvatarInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle("Сохранение...");
    onUpdateAvatar(avatarInput.value).finally(() => {
      setSubmitButtonTitle("Сохранить");
      clearInputs();
    });
  };

  const handleClose = () => {
    onClose();
    clearInputs();
  };

  return (
    <PopupWithForm
      name="avatar"
      formTitle="Обновить аватар"
      submitButtonTitle={submitButtonTitle}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!avatarInput.isValid}
    >
      <input
        className="form__input form__input_theme_light"
        type="url"
        name="newAvatarLink"
        placeholder="Ссылка на картинку"
        required
        value={avatarInput.value}
        onChange={onAvatarInputChange}
      />
      <span className="form__error" id="newAvatarLink-error">
        {avatarInput.errorMessage}
      </span>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};

export default EditAvatarPopup;
