import { Card } from './card.js';
import { initialCards } from './cards.js';
import { Section } from './section.js';
import { PopupWithImage } from './popupWithImage.js';
import { PopupWithForm } from './popupWithForm.js';
import { validationConfig, FormValidator } from './formValidate.js';
import { UserInfo } from './userInfo.js';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const textInput = document.querySelector('.popup__input_type_text');
const userProfile  = document.querySelector('.profile__name');
const userText = document.querySelector('.profile__text');
const popupAddFormLinkInput = document.querySelector('.popup__input_type_link');
const popupAddFormTitleInput = document.querySelector('.popup__input_type_title');

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

const popupAddCard = new PopupWithForm('.popup_add', handleFormSubmit);


function handleFormSubmit(evt) {
  const link = popupAddFormLinkInput.value;
  const name = popupAddFormTitleInput.value;
  const item = { name: name, link: link }
  createCard(item);
  addFormValidator.disabledSubmitButton();
  popupAddCard.close();
  evt.preventDefault;
}

popupAddCard.setEventListeners();

formAddOpenButton.addEventListener('click', function () {
  popupAddCard.open();
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

function submitEditProfileForm({name, about}) {
  userInfo.setUserInfo({name, about});
  popupEditProfile.close();
};

const editProfileFormValidator = new FormValidator(validationConfig, popupEdit);
const addFormValidator = new FormValidator(validationConfig, popupAdd);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

// enableValidation(validationConfig);