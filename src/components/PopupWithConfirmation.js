import { Popup } from "./popup";
import { config } from "./utils/constants";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._button = this._popup.querySelector(config.submitButtonSelector);
        this._handleSubmit = handleSubmit;
    }

_setEventListeners() {
    super.setEventListeners();
    this._button.addEventListeners('click', (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._cardId, this._element);
    })
}

open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
    this._setEventListeners();
}

}
