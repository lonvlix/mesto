import { Card } from '../src/components/card.js';
import { initialCards } from '../src/components/constants';
import { Section } from '../src/components/section.js';
import { PopupWithImage } from '../src/components/popupWithImage.js';
import { PopupWithForm } from '../src/components/popupWithForm.js';
import { FormValidator } from '../src/components/formValidate.js';
import { validationConfig } from '../src/components/constants.js';
import { UserInfo } from '../src/components/userInfo.js';
import '../pages/index.css';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const textInput = document.querySelector('.popup__input_type_text');
const userProfile = document.querySelector('.profile__name');
const userText = document.querySelector('.profile__text');

const elementsContainer = document.querySelector('.elements');

const section = new Section({
  items: initialCards,
  renderer: item => {
    section.addItem(createCard(item))
  },
}, elementsContainer
)

initialCards.forEach(createCard);

function createCard(item) {
  const card = new Card(item, handleCardClick, '#element-template');

  const cardElement = card.generateCard();

  elementsContainer.prepend(cardElement);
}

const popupWithImages = new PopupWithImage('#popup_image');
popupWithImages.setEventListeners();

function handleCardClick(name, link) {
  popupWithImages.open(name, link);
}

const popupAddCard = new PopupWithForm('.popup_add', handleAddFormSubmit);


function handleAddFormSubmit({ text, link }) {
  const item = { name: text, link }
  createCard(item);
  popupAddCard.close();
}

popupAddCard.setEventListeners();

formAddOpenButton.addEventListener('click', function (evt) {
  popupAddCard.open();
  evt.preventDefault();
});

const userInfo = new UserInfo('.profile__name', '.profile__text');

const popupEditProfile = new PopupWithForm('.popup_edit', submitEditProfileForm);
popupEditProfile.setEventListeners();

profileEditOpenButton.addEventListener('click', function (evt) {
  popupEditProfile.open();
  nameInput.value = userProfile.textContent;
  textInput.value = userText.textContent;
  userInfo.getUserInfo();
  evt.preventDefault();
});

function submitEditProfileForm({ name, about }) {
  userInfo.setUserInfo({ name, about });
  popupEditProfile.close();
};

const editProfileFormValidator = new FormValidator(validationConfig, popupEdit);
const addFormValidator = new FormValidator(validationConfig, popupAdd);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

addFormValidator.disabledSubmitButton();

// enableValidation(validationConfig);

// Павел, спасибо вам большое, не встречала еще таких хороших ревьюеров)) надеюсь моя работа попадется вам еще (если, конечно, вы не намучились)