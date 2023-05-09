export class UserInfo {
    constructor(nameSelector, textSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._text = document.querySelector(textSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._text.textContent
        }
    }

    setUserInfo({ name, about, _id, avatar }) {
        this._name.textContent = name;
        this._text.textContent = about;
        this._id = _id;
        this.avatar = avatar;
        if (avatar) {
            this._avatar.src = avatar
            this._avatar.alt = name
        }
    }

    getUserId() {
        return this._id;
    }

}