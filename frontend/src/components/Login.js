import React, { useState } from "react";
import PropTypes from "prop-types";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data.email, data.password);
  };

  return (
    <div className="auth">
      <form
        className="form form_theme_dark"
        name="login"
        action="#"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="form__title form__title_theme_dark">Вход</h2>

        <input
          className="form__input form__input_theme_dark"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />

        <input
          className="form__input form__input_theme_dark"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />

        <button
          className="form__submit-button form__submit-button_theme_dark"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
