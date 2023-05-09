import { Popup } from "./Popup";
import { config } from "./utils/constants";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__save');
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._handleFormSubmit(this._element)
        })
    }

    setDeleteCard(element) {
        this._element = element;
    }
}
