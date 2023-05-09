import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleAddFormSubmit) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputElement = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__save');
    this._submitButtonText = this._submitButton.textContent
    this._textSubmit = 'Сохранение...';
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
      this.startLoading();
      evt.preventDefault();
      this._handleAddFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(item) {
    this._inputElement.forEach((input) => {
      input.value = item[input.name];
    })
  }

  startLoading() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._textSubmit;
  }

  stopLoading() {
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._submitButtonText;
  }

}