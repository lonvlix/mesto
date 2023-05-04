import { Card } from '../src/components/card.js';
import { Section } from '../src/components/section.js';
import { PopupWithImage } from '../src/components/popupWithImage.js';
import { PopupWithForm } from '../src/components/popupWithForm.js';
import { FormValidator } from '../src/components/formValidate.js';
import { config } from '../src/components/utils/constants.js';
import { UserInfo } from '../src/components/userInfo.js';
import './index.css';
import { PopupWithConfirm } from '../src/components/PopupWithConfirm.js';
import { Api } from '../src/components/api.js';

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupUpdate = document.querySelector('.popup_update');
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

function handleConfirmDelete(card) {
  popupWithConfirm.setDeleteCard(card);
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

//  function handleAddFormSubmit({ text, link }) {
//    const data = { name: text, link }
//    createCard(data);
//    popupAddCard.close();
//  }

const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__avatar');

const popupEditProfile = new PopupWithForm('.popup_edit', ({name, about, id}) => {
    api.setUserInfo({name, about, id})
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

const popupWithConfirm = new PopupWithConfirm('.popup_sure', card => {
  api.deleteCard(card._id)
    .then(() => {
      handleDeleteCard(card)
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

const editProfileFormValidator = new FormValidator(config, popupEdit);
const addFormValidator = new FormValidator(config, popupAdd);
const avatarFormValidator = new FormValidator(config, popupUpdate);

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

// profileAddButton.addEventListener('click', () => {
//   addFormValidator.toggleButtonState();
//   addFormValidator.removeValidation();
//   popupAddCard.open();
// });

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// profileUpdateAvatarFormValidator.disabledSubmitButton();
// addFormValidator.disabledSubmitButton();

// enableValidation(validationConfig);