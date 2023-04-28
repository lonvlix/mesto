import { Card } from '../components/card.js';
import { Section } from '../components/section.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { FormValidator } from '../components/formValidate.js';
import { config } from '../components/utils/constants.js';
import { UserInfo } from '../components/userInfo.js';
import './index.css';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Api } from '../components/api.js';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupUpdate = document.querySelector('.popup_update');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const profileUpdateAvatarButton = document.querySelector('.profile__avatar');
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

const section = new Section(
  (item) => {
    const card = createCard(item)
    section.addItem(card)
  }, elementsContainer
)

// initialCards.forEach(createCard);

const popupWithImages = new PopupWithImage('#popup_image');
popupWithImages.setEventListeners();

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
}
);

popupAddCard.setEventListeners();

// function handleAddFormSubmit({ text, link }) {
//   const data = { name: text, link }
//   createCard(data);
//   popupAddCard.close();
// }

formAddOpenButton.addEventListener('click', function () {
  popupAddCard.open();
});

const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__avatar');

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

popupUpdateAvatar.setEventListeners();

profileUpdateAvatarButton.addEventListener('click', function () {
  popupUpdateAvatar.open();
});

const popupWithConfirm = new PopupWithConfirm('.popup_sure', card => {
  api.deleteCard(card._id)
    .then(() => {
      handleDeleteClick(card)
    })
    .catch(err => console.log(`Ошибка: ${err}`))
});

function handleConfirmDelete(card) {
  popupWithConfirm.setDeleteCard(card);
  popupWithConfirm.open();
}

function handleDeleteCard(cardElement) {
  cardElement.handleDeleteClick();
  popupWithConfirm.close();
}

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

const editProfileFormValidator = new FormValidator(config, popupEdit);
const addFormValidator = new FormValidator(config, popupAdd);
const profileUpdateAvatarFormValidator = new FormValidator(config, popupUpdate);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();
profileUpdateAvatarFormValidator.enableValidation();

profileUpdateAvatarFormValidator.disabledSubmitButton();
addFormValidator.disabledSubmitButton();

// enableValidation(validationConfig);