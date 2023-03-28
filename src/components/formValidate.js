

export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.typeError);
      };
      
      _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.typeError);
      };
      
      _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement);
        };
      };

      _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._config.inactiveButtonClass);
          this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    };
      
      _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
      };
      
      _setEventListener() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._buttonElement);
            });
       });
       };
    
     resetValidation() {
        // this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
     }
     disabledSubmitButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
     }
    
     enableValidation() {
      this._toggleButtonState(this._buttonElement);
      this._setEventListener();
     }
}