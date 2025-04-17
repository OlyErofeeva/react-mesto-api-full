import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";
import useValidatedState from "../utils/useValidatedState";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [submitButtonTitle, setSubmitButtonTitle] = React.useState("Сохранить");

  const {
    inputState: nameInput,
    onChange: onNameInputChange,
    reset: resetNameInput,
  } = useValidatedState("");

  const {
    inputState: descriptionInput,
    onChange: onDescriptionInputChange,
    reset: resetDescriptionInput,
  } = useValidatedState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitButtonTitle("Сохранение...");
    onUpdateUser({
      name: nameInput.value,
      about: descriptionInput.value,
    }).finally(() => {
      setSubmitButtonTitle("Сохранить");
    });
  };

  const resetInputs = (userContext) => {
    resetNameInput(userContext.name, true);
    resetDescriptionInput(userContext.about, true);
  };

  const handleClose = () => {
    onClose();
    resetInputs(currentUser);
  };

  React.useEffect(() => {
    resetInputs(currentUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      formTitle="Редактировать профиль"
      submitButtonTitle={submitButtonTitle}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!nameInput.isValid || !descriptionInput.isValid}
    >
      <input
        className="form__input form__input_theme_light"
        type="text"
        name="newProfileFullName"
        placeholder="Полное имя"
        required
        minLength="2"
        maxLength="40"
        value={nameInput.value}
        onChange={onNameInputChange}
      />
      <span className="form__error" id="newProfileFullName-error">
        {nameInput.errorMessage}
      </span>

      <input
        className="form__input form__input_theme_light"
        type="text"
        name="newProfileBio"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={descriptionInput.value}
        onChange={onDescriptionInputChange}
      />
      <span className="form__error" id="newProfileBio-error">
        {descriptionInput.errorMessage}
      </span>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default EditProfilePopup;
