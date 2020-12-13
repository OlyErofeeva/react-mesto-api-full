import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

function PopupWithForm({
  name,
  formTitle,
  submitButtonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled,
}) {
  return (
    <div
      className={cn(`modal modal_for_${name}`, {
        "modal_opened": isOpen
      })}
    >
      <div className="modal__content">
        <form
          className="form form_theme_light"
          name={name}
          action="#"
          noValidate
          onSubmit={onSubmit}
        >
          <div>
            <h2 className="form__title form__title_theme_light">{formTitle}</h2>
            {children}
          </div>
          <div>
            <button
              className={cn("form__submit-button", {
                "form__submit-button_disabled": isSubmitDisabled,
                "form__submit-button_theme_light": !isSubmitDisabled,
              })}
              type="submit"
              disabled={isSubmitDisabled}
            >
              {submitButtonTitle}
            </button>
          </div>
        </form>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  submitButtonTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool,
};

export default PopupWithForm;
