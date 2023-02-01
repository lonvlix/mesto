export class Card {
    constructor(item, handleImageClick, templateSelector) {
        this._name = item.name;
        this._link = item.link;
        this._handleImageClick = handleImageClick;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#element-template').content
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
        this._setEventListeners();
        //добавление картинки
        this._elementImageCard.src = this._link;
        this._elementImageCard.alt = this._name;
        //добавление названия
        this._elementNameCard.textContent = this._name;

        return this._element;
    }

    _setEventListeners() {

        this._elementLikeCard.addEventListener("click", () => {
            this._handleLikeClick();
        });

        this._elementDeleteCard.addEventListener("click", () => {
            this._handleDeleteClick();
        });

        this._elementImageCard.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });
    }

    _handleLikeClick() {
        this._elementLikeCard.classList.toggle('element__like-button_active');
    }

    _handleDeleteClick() {
        this._element.remove();
    }
}