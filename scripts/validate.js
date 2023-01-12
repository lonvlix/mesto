const validationConfig = {
    inputSelector: '.popup__input',
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible',
    inactiveButtonClass: 'popup__save_invalid'
};

const showInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = ''; 
    errorElement.classList.remove(config.errorClass);
};
 
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
       hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => { 
    if (hasInvalidInput(inputList)) { 
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else { 
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
  };

};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
   });
};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, config);
 });
};
