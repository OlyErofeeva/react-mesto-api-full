import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Link } from "react-router-dom";
import logo from "../images/logo_color_white.svg";

function Header({ userAuthData, handleLogout }) {
  const [isMenuButtonPressed, setIsMenuButtonPressed] = useState(false);

  const handleMenuClick = () => {
    setIsMenuButtonPressed(!isMenuButtonPressed);
  };

  return (
    <header className="header page__header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Mesto" />

        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <div
              className={cn("header__logout-container", {
                "header__logout-container_visible": isMenuButtonPressed,
              })}
            >
              <p className="header__user-info">{userAuthData.email}</p>
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
            <button
              className={cn("header__menu-button", {
                "header__menu-button_icon_hamburger": !isMenuButtonPressed,
                "header__menu-button_icon_close": isMenuButtonPressed,
              })}
              type="button"
              onClick={handleMenuClick}
            ></button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

Header.propTypes = {
  userAuthData: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
