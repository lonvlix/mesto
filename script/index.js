const editButton = document.querySelector('.profile__edit-button'),
  popUp = document.querySelector('.popup'),
  popUpForm = popUp.querySelector('.popup__form'),
  closeButton = popUp.querySelector('.popup__close-button'),
  profileEditName = popUp.querySelector('.popup__input_type_name'),
  profileEditText = popUp.querySelector('.popup__input_type_text'),
  profileName = document.querySelector('.profile__name'),
  profileText = document.querySelector('.profile__text');

function popUpOpen() {
      profileEditName.value = profileName.textContent;
      profileEditText.value = profileText.textContent;
      
      popUp.classList.toggle('popup_opened');
}
      
      function popUpClose() {
      popUp.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {  
    evt.preventDefault(); 
  
    profileName.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
    
    popUpClose();
}

editButton.addEventListener('click', popUpOpen);
closeButton.addEventListener('click', popUpClose);

popUpForm.addEventListener('submit', formSubmitHandler);