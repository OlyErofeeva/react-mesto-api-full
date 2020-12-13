import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

function InfoTooltip({ isOpen, onClose, isSuccessful }) {
  return (
    <div className={cn("modal", {
      "modal_opened": isOpen,
    })}>
      <div className="modal__content">
        <div className="tooltip">
          <div
            className={cn("tooltip__icon", {
              "tooltip__icon_state_success": isSuccessful,
              "tooltip__icon_state_fail": !isSuccessful,
            })}
          ></div>

          {isSuccessful ? (
            <h2 className="tooltip__title">Вы успешно зарегистрировались!</h2>
          ) : (
            <h2 className="tooltip__title">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          )}
        </div>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
};

export default InfoTooltip;
