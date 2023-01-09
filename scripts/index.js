const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup_image');
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

const elementInfo = initialCards.map;

const createCard = (cardLink, cardName) => {

const elementTemplate = document.querySelector('#element-template').content;

const elementCard = elementTemplate.querySelector('.element').cloneNode(true);

const elementCardImage = elementCard.querySelector('.element__image');

const elementcardName = elementCard.querySelector('.element__name');
  elementCardImage.alt = cardName;
  elementCardImage.src = cardLink;
  elementcardName.textContent = cardName;
  
  elementCard.querySelector('.element__trash').addEventListener('click', function() {
    elementCard.remove();
  });

  elementCard.querySelector('.element__like').addEventListener('click', function (event){
    event.target.classList.toggle('element__like-button_active');
  });
    
  elementCardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImagePlace.src = cardLink;
    popupImagePlace.alt = cardName;
    popupImageName.textContent = cardName;
});
  return elementCard;
};

const addCard = (cardNew) => {
  elementsContainer.prepend(cardNew);
};

initialCards.forEach((item) => {
  addCard(createCard(item.link, item.name));
});

function submitAddCardForm (evt) {
  evt.preventDefault();
    const cardLink =  popupAddFormLinkInput.value;
    const cardName = popupAddFormTitleInput.value;

  addCard(createCard(cardLink, cardName));

  closePopup(popupAdd);
  popupAddFormTitleInput.value = "";
  popupAddFormLinkInput.value = "";
};

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
});

formAddOpenButton.addEventListener('click', function() {
  openPopup(popupAdd);
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

popupAdd.addEventListener('submit', submitAddCardForm);
popupEdit.addEventListener('submit', submitEditProfileForm);
enableValidation(validationConfig);