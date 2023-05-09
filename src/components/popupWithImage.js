import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePlace = this._popup.querySelector('.popup__img-place');
        this._popupImageName = this._popup.querySelector('.popup__name');
    }

    open(name, link) {
        super.open();

        this._popupImagePlace.src = link;
        this._popupImagePlace.alt = name;
        this._popupImageName.textContent = name;
    }

}