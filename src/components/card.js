export class Card {
    constructor(item, handleCardClick, handleLikeClick, templateSelector, handleConfirmDelete, handleDeleteCard, userId) {
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._likes = item.likes;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._templateSelector = templateSelector;
        this._handleConfirmDelete = handleConfirmDelete;
        this._handleDeleteCard = handleDeleteCard;
        this._owner = item.owner;
        this._isLike = false;
        this._userId = userId;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector).content
            .querySelector('.element').cloneNode(true);
        return cardElement;
    }

    //функция создания карточки
    generateCard() {
        this._element = this._getTemplate();
        //классовые переменные 
        this._elementLikeCard = this._element.querySelector('.element__like');
        this._elementDeleteCard = this._element.querySelector('.element__trash');
        this._elementImageCard = this._element.querySelector('.element__image');
        this._elementNameCard = this._element.querySelector('.element__name');
        this._elementLike = this._element.querySelector('.element__like-counter');
        this._setEventListeners();
        //добавление названия
        this._elementNameCard.textContent = this._name;
        //добавление картинки
        this._elementImageCard.src = this._link;
        this._elementImageCard.alt = this._name;

        this._elementLike.textContent = this._likes.length;

        if (this._userId !== this._owner._id) this._elementDeleteCard.remove();

        if (this._likes.find(item => item._id === this._userId)) {
            this._elementLikeCard.classList.add('element__like-button_active');
            this._isLike = true;
        }
        return this._element;
    }

    _setEventListeners() {

        this._elementLikeCard.addEventListener("click", () => {
            this._handleLikeClick(this);
        });

        this._elementDeleteCard.addEventListener("click", () => {
            this._handleConfirmDelete(this);
        });

        this._elementImageCard.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    get isLike() {
        return this._isLike;
    }

    _handleDeleteCard() {
        this._element.remove();
        // this._element = null;
    }

    numberOfLikes(newLikes) {
        this._likes = newLikes;
        this._elementLike.textContent = this._likes.length;
    }

    likeStatus() {
        this._isLike = !this._isLike;
    }

    toggleLike() {
        this._elementLikeCard.classList.toggle('element__like-button_active');
    }

    toggleLikeCard(item) {
        this._likes = item.likes;
        this._elementLike.textContent = this._likes.length;
        this._elementLikeCard.classList.toggle('element__like-button_active');
    }

}