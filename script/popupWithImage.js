import { Popup } from './popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePlace = document.querySelector('.popup__img-place');
        this._popupImageName = document.querySelector('.popup__name');
    }

    open(name, link) {
        super.open();

        this._popupImagePlace.src = link;
        this._popupImagePlace.alt = name;
        this._popupImageName.textContent = name;
    }

}