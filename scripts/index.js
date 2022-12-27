const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup_image');
const popupImagePlace = document.querySelector('.popup__img-place');
const popupImageName = document.querySelector('.popup__name');
const closePopupButtons = document.querySelectorAll('.popup__close');
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

const initialCards = [
  {
    name: 'Альпы',
    link: 'https://images.unsplash.com/photo-1671514187753-fce32cc8b3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=487&q=80'
  },
  {
    name: 'Сан-Франциско',
    link: 'https://images.unsplash.com/photo-1671167831465-8c3b480f7a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Эстония',
    link: 'https://images.unsplash.com/photo-1664737061963-862d6a174a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1669792245896-0253b9a55560?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
  },
  {
    name: 'Каппадокия',
    link: 'https://images.unsplash.com/photo-1669046638067-644a3685e71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Квалейя',
    link: 'https://images.unsplash.com/photo-1669745356031-230d593866b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
];

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
};

function closePopup(item) {
  item.classList.remove('popup_opened');
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

closePopupButtons.forEach(btn => btn.addEventListener('click', () => {
  const popup = btn.closest('.popup');
  closePopup(popup);
}));

popupAdd.addEventListener('submit', submitAddCardForm);
popupEdit.addEventListener('submit', submitEditProfileForm);


