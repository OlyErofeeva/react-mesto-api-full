class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      const status = res.status;
      const statusText = res.statusText;

      return res.json().then((info) => 
        Promise.reject(new Error(`Что-то пошло не так: ${info.message} (${status} ${statusText})`))
      );
    }
  }

  /**
   * getUserLoginInfo response example:
      {
        "data": {
          "_id": "5f5204c577488bcaa8b7bdf2",,
          "email": "email@yandex.ru"
      }
    }
    * @param {string} token
   */
  getUserLoginInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * signUp response example:
    {
      "data": {
        "_id": "5f5204c577488bcaa8b7bdf2",,
        "email": "email@yandex.ru"
      }
    }
   * @param {string} password
   * @param {string} email
   */
  signUp(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._handleResponse);
  }

  /**
   * signIn response example:
    {
      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    }
   * @param {*} password 
   * @param {*} email 
   */
  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._handleResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
