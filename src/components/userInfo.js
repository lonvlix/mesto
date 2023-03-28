export class UserInfo {
    constructor(nameSelector, textSelector) {
        this._nameUser = document.querySelector(nameSelector);
        this._textUser = document.querySelector(textSelector);
    }

    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            about: this._textUser.textContent
        }
    }

    setUserInfo({name, about}) {
        this._nameUser.textContent = name;
        this._textUser.textContent = about;
    }
}