export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })

    .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  setUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then(res => this._checkResponse(res));
  }

  updateAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
    .then(res => this._checkResponse(res));
  }

}