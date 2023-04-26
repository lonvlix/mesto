import { Popup } from "./popup";
import { config } from "./utils/constants";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._button = this._popup.querySelector(config.submitButtonSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _setEventListeners() {
        super.setEventListeners()

        this._button.addEventListener('click', () => {
            this._handleFormSubmit(this._card)
        })
    }


    _setDeleteCard(card) {
        this._card = card;
    }

}
