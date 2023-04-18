import { Card } from '../src/components/card.js';
// import { initialCards } from '../src/components/utils/constants.js';
import { Section } from '../src/components/section.js';
import { PopupWithImage } from '../src/components/popupWithImage.js';
import { PopupWithForm } from '../src/components/popupWithForm.js';
import { Popup } from '../src/components/popup.js'
import { FormValidator } from '../src/components/formValidate.js';
import { config } from '../src/components/utils/constants.js';
import { UserInfo } from '../src/components/userInfo.js';
import '../pages/index.css';
import { PopupWithConfirmation } from '../src/components/PopupWithConfirmation.js';
import { Api } from '../src/components/api.js';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupUpdate = document.querySelector('.popup_update');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const profileUpdateAvatarButton = document.querySelector('.profile__avatar');
const elementDelete = document.querySelector('.element__trash');
const nameInput = document.querySelector('.popup__input_type_name');
const textInput = document.querySelector('.popup__input_type_text');
const elementsContainer = document.querySelector('.elements');

let myID;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '05968ff5-a8da-4da2-b369-e5ee45cc0283',
    'Content-Type': 'application/json',
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [item] = res;

    userInfo.setUserInfo(item);
    section.renderItems(item);
  })
  .catch(err => console.log(err));

function createCard(item) {
  const card = new Card(
    item,
    handleCardClick,
    '#element-template'
  );
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
}

const section = new Section({
  renderer: item => {
    section.addItem(createCard(item))
  },
}, elementsContainer
)

// initialCards.forEach(createCard);

const popupWithImages = new PopupWithImage('#popup_image');
popupWithImages.setEventListeners();

function handleCardClick(name, link) {
  popupWithImages.open(name, link);
}

const popupAddCard = new PopupWithForm('.popup_add', handleAddFormSubmit);

function handleAddFormSubmit({ text, link }) {
  const data = { name: text, link }
  createCard(data);
  popupAddCard.close();
}

popupAddCard.setEventListeners();

formAddOpenButton.addEventListener('click', function () {
  popupAddCard.open();
});

const userInfo = new UserInfo('.profile__name', '.profile__text');

const popupEditProfile = new PopupWithForm('.popup_edit', submitEditProfileForm);
popupEditProfile.setEventListeners();

profileEditOpenButton.addEventListener('click', function () {
  popupEditProfile.open();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  textInput.value = about;
});

function submitEditProfileForm({ name, about }) {
  userInfo.setUserInfo({ name, about });
  popupEditProfile.close();
};

const popupUpdateAvatar = new PopupWithForm('.popup_update', profileUpdateAvatarButton);
popupUpdateAvatar.setEventListeners();

profileUpdateAvatarButton.addEventListener('click', function () {
  popupUpdateAvatar.open();
});

const PopupWithConfirm = new PopupWithConfirmation('.popup_sure', handleSubmit => {
  api.removeCard(cardId)
    .then(() => {
      element.remove();
      element = null;
      PopupWithConfirm.close();
    })
    .catch((err) => console.log(err));
}
);



const editProfileFormValidator = new FormValidator(config, popupEdit);
const addFormValidator = new FormValidator(config, popupAdd);
const profileUpdateAvatarFormValidator = new FormValidator(config, popupUpdate);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();
profileUpdateAvatarFormValidator.enableValidation();

profileUpdateAvatarFormValidator.disabledSubmitButton();
addFormValidator.disabledSubmitButton();

// enableValidation(validationConfig);