import { Popup } from './popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleAddFormSubmit) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputElement = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {
    const inputFormValues = {};

    this._inputElement.forEach(inputItem => {
      inputFormValues[inputItem.name] = inputItem.value;
    })

    return inputFormValues;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleAddFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}