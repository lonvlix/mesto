import { Card } from './card.js';
import { initialCards } from './cards.js';
import { validationConfig, formValidator } from './formValidate.js';

const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('#popup_image');
const popupImagePlace = document.querySelector('.popup__img-place');
const popupImageName = document.querySelector('.popup__name');
const popupCloseButton = document.querySelectorAll('.popup__close');
const formAddOpenButton = document.querySelector('.profile__add-button');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const textInput = document.querySelector('.popup__input_type_text');
const userProfile = document.querySelector('.profile__name');
const userText = document.querySelector('.profile__text');
const popupAddFormArea = document.querySelector('.popup__add-area');
const popupAddFormLinkInput = document.querySelector('.popup__input_type_link');
const popupAddFormTitleInput = document.querySelector('.popup__input_type_title');
const inputElementFields = Array.from(popupAddFormArea.querySelectorAll('.popup__input'));
const buttonActive = popupAddFormArea.querySelector('.popup__save-button');

const elementsContainer = document.querySelector('.elements');

initialCards.forEach(createCard);

function createCard (item) {
  const card = new Card(item, '#templateCard', handleImageClick);

  const cardElement = card.generateCard();

  elementsContainer.prepend(cardElement);
}

function handleImageClick (name, link) {
  openPopup(popupImage);
  popupImagePlace.src = link;
  popupImagePlace.alt = name;
  popupImageName.textContent = name;
};

popupAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
    const link =  popupAddFormLinkInput.value;
    const name = popupAddFormTitleInput.value;
    const item = {name: name, link: link}
  
  popupAddFormTitleInput.value = "";
  popupAddFormLinkInput.value = "";
  const button = evt.submitter;
  button.disabled = true;
  button.classList.add('popup__save_invalid');
  createCard(item);
  closePopup(popupAdd);
});



function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

profileEditOpenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = userProfile.textContent;
  textInput.value = userText.textContent;
  addFormValidator.resetValidation();
});

formAddOpenButton.addEventListener('click', function() {
  openPopup(popupAdd);
  editProfileFormValidator.resetValidation();
});

function submitEditProfileForm (evt) {
  evt.preventDefault();

userProfile.textContent = nameInput.value;
userText.textContent = textInput.value;
closePopup(popupEdit);
};

popupCloseButton.forEach(btn => btn.addEventListener('click', () => {
  const popup = btn.closest('.popup');
  closePopup(popup);
}));

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
      const openPopup = document.querySelector('.popup_opened');
      closePopup(openPopup);
  };
};

popups.forEach((popups) => {
  popups.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popups);
      };
  });
});

const editProfileFormValidator = new formValidator(validationConfig, popupEdit);
const addFormValidator = new formValidator(validationConfig, popupAdd);

editProfileFormValidator.enableValidation();
addFormValidator.enableValidation();

// popupAdd.addEventListener('submit', popupAdd);
 popupEdit.addEventListener('submit', submitEditProfileForm);
// enableValidation(validationConfig);