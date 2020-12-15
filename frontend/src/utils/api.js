class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error(`Что-то пошло не так: ${res.status} ${res.statusText}`)
      );
    }
  }

  /**
   * getUserInfo response example:
      {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        "_id": "e20537ed11237f86bbb20ccb",
        "cohort": "cohort0"
      }
   */
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * getInitialCards response example:
      [
        {
          "likes": [],
          "_id": "5d1f0611d321eb4bdcd707dd",
          "name": "Байкал",
          "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
          "owner": {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "ef5f7423f7f5e22bef4ad607",
            "cohort": "local"
          },
          "createdAt": "2019-07-05T08:10:57.741Z"
        },
        {
          "likes": [],
          "_id": "5d1f064ed321eb4bdcd707de",
          "name": "Архыз",
          "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
          "owner": {
            "name": "Jacques Cousteau",
            "about": "Sailor, researcher",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
            "_id": "ef5f7423f7f5e22bef4ad607",
            "cohort": "local"
          },
          "createdAt": "2019-07-05T08:11:58.324Z"
        }
      ]
   */
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * editProfile response example:
      {
        "name": "Marie Skłodowska Curie",
        "about": "Physicist and Chemist",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        "_id": "e20537ed11237f86bbb20ccb",
        "cohort": "cohort0",
      }
   * @param {object} newData - Object created from "editProfile" form inputs.
   */
  editProfile(token, newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newData.name,
        about: newData.about,
      }),
    }).then(this._handleResponse);
  }

  /**
   * changeAvatar response example:
      {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        "_id": "a2b59bdd09e8dc8797e8992c",
        "cohort": "cohort-15"
      }
   * @param {string} avatarLink - New avatar link.
   */
  changeAvatar(token, avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._handleResponse);
  }

  /**
   * saveCard response example:
      {
        "likes": [],
        "_id": "5d1f0611d321eb4bdcd707dd",
        "name": "Байкал",
        "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        "owner": {
          "name": "Jacques Cousteau",
          "about": "Sailor, researcher",
          "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
          "_id": "ef5f7423f7f5e22bef4ad607",
          "cohort": "local"
        },
        "createdAt": "2019-07-05T08:10:57.741Z"
      }
   * @param {object} cardData - Object with properties of a new card.
   */
  saveCard(token, cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this._handleResponse);
  }

  /**
   * deleteCard response example:
      {
        "message": "Пост удалён"
      }
   * @param {string} cardId - Id of the card that user wants to delete.
   */
  deleteCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * likeCard response example:
      {
        "likes": [
            {
                "name": "99",
                "about": "99",
                "avatar": "https://images.unsplash.com/photo-1521543944615-2e0d4f5b0498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                "_id": "a2b59bdd09e8dc8797e8992c",
                "cohort": "cohort-15"
            }
        ],
        "_id": "5f5f844c8b8a4e001f0880ad",
        "name": "jg",
        "link": "https://images.unsplash.com/photo-1517857047616-db2b017371e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        "owner": {
            "name": "Александр",
            "about": "Студент",
            "avatar": "https://images.unsplash.com/photo-1534611926209-ca37564bd9bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80",
            "_id": "8ef98d608592851ee6ab8bb6",
            "cohort": "cohort-15"
        },
        "createdAt": "2020-09-14T14:55:08.012Z"
      }
   * @param {string} cardId - Id of the card that user likes.
   */
  likeCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * dislikeCard & likeCard response structures are the same
   * @param {string} cardId - Id of the card that user dislikes.
   */
  dislikeCard(token, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  /**
   * @param {string} cardId - Id of the card that user likes/dislikes.
   * @param {boolean} isLiked - true if the card is liked.
   */
  changeLikeCardStatus(token, cardId, isLiked) {
    return isLiked ? this.dislikeCard(token, cardId) : this.likeCard(token, cardId);
  }
}

export const api = new Api({
  baseUrl: "https://api.oly.students.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
