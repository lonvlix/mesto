let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let textInput =  formElement.querySelector('.popup__input_type_text');
let nameInput = formElement.querySelector('.popup__input_type_name');
let closeButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let editButton = document.querySelector('.profile__edit');

function closePopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);