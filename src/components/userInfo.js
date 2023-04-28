export class UserInfo {
    constructor(nameSelector, textSelector, avatarSelector) {
        this._nameUser = document.querySelector(nameSelector);
        this._textUser = document.querySelector(textSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            about: this._textUser.textContent
        }
    }

    setUserInfo({ name, about, id }) {
        this._nameUser.textContent = name;
        this._textUser.textContent = about;
        // this._avatar.src = avatar;
        // this._avatar.alt = name;
        this._id = id;
    }

        getUserId() {
            return this._id;
        }

    }