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
   * signUp response example:
    {
      "name": "Жак-Ив Кусто",
      "about": "Иссследователь",
      "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      "_id": "5fd8e8762e9a7c07cce95710",
      "email": "ololo@yandex.ru",
      "__v": 0
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
   * @param {string} password 
   * @param {string} email 
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
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
