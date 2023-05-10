import { Card } from '../components/card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidate.js';
import { config } from '../components/utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupUpdate = document.querySelector('.popup_update');
const popupSure = document.querySelector('.popup_sure');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileUpdateAvatarButton = document.querySelector('.profile__avatar');
const profileAvatarEdit = document.querySelector('.profile__edit-avatar');
const nameInput = document.querySelector('.popup__input_type_name');
const textInput = document.querySelector('.popup__input_type_text');
const elementsContainer = document.querySelector('.elements');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '05968ff5-a8da-4da2-b369-e5ee45cc0283',
    'Content-Type': 'application/json',
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [userData, cardsArray] = res;

    userInfo.setUserInfo(userData);
    section.renderItems(cardsArray);
  })
  .catch(err => console.log(err));

function createCard(item) {
  const card = new Card(
    item,
    handleCardClick,
    handleLikeClick,
    '#element-template',
    handleConfirmDelete,
    handleDeleteCard,
    userInfo.getUserId()
  );
  return card.generateCard();
}

function handleConfirmDelete(element) {
  popupWithConfirm.setDeleteCard(element);
  popupWithConfirm.open();
}

function handleDeleteCard(cardElement) {
  cardElement.deleteCard();
  popupWithConfirm.close();
}

const section = new Section(
  (item) => {
    const card = createCard(item)
    section.addItem(card)
  }, elementsContainer
)

const popupWithImages = new PopupWithImage('#popup_image');

function handleCardClick(name, link) {
  popupWithImages.open(name, link);
}

const popupAddCard = new PopupWithForm('.popup_add', item => {
  api.addNewCard(item)
    .then((res) => {
      section.addItem(createCard(res))
      popupAddCard.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAddCard.stopLoading();
    })
});

formAddOpenButton.addEventListener('click', function () {
  popupAddCard.open();
});

const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__avatar');

const popupEditProfile = new PopupWithForm('.popup_edit', ({ name, about, id }) => {
  api.setUserInfo({ name, about, id })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupEditProfile.stopLoading();
    })
});

const popupUpdateAvatar = new PopupWithForm('.popup_update', item => {
  api.updateAvatar(item)
    .then((item) => {
      userInfo.setUserInfo(item)
      console.log(item)
      popupUpdateAvatar.close()
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupUpdateAvatar.stopLoading();
    })
});

profileUpdateAvatarButton.addEventListener('click', function () {
  popupUpdateAvatar.open();
});

const popupWithConfirm = new PopupWithConfirmation('.popup_sure', element => {
  api.deleteCard(element._id)
    .then(() => {
      handleDeleteCard(element)
    })
    .catch(err => console.log(`Ошибка: ${err}`))
});

function handleLikeClick(card) {
  if (card.isLike) {
    api.deleteLike(card._id)
      .then(res => {
        card.numberOfLikes(res.likes);
        card.likeStatus();
        card.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  } else {
    api.setLike(card._id)
      .then(res => {
        card.numberOfLikes(res.likes);
        card.likeStatus();
        card.toggleLike();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
}

popupWithImages.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithConfirm.setEventListeners();

const editProfileFormValidator = new FormValidator(config, popupEdit);
const addFormValidator = new FormValidator(config, popupAdd);
const avatarFormValidator = new FormValidator(config, popupUpdate);
const deletePopupFormValidator = new FormValidator(config, popupSure)

profileAvatarEdit.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState();
  avatarFormValidator.removeValidation();
  popupUpdateAvatar.open();
});

profileEditOpenButton.addEventListener('click', function () {
  popupEditProfile.setInputValues(userInfo.getUserInfo())
  editProfileFormValidator.toggleButtonState();
  popupEditProfile.open();
});

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
deletePopupFormValidator.enableValidation();
