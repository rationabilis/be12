import Popup from '../popup/popup';

export default class Card {
    constructor(placeName, placeLink) {
      this.placeName = placeName;
      this.placeLink = placeLink;
      this.card = this.create();
      this.imageOrDelete = this.imageOrDelete.bind(this);
      this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      this.card.querySelector('.place-card__image').addEventListener('click', this.imageOrDelete);
    }
  
    imageOrDelete(evt) {
        /* Попап изображения*/
        if (evt.target.classList.contains('place-card__image')) {this.popupCall();};
  
       /* Удаляет карточку кликом по кнопке корзина */
        if (evt.target.classList.contains('place-card__delete-icon')) {this.remove();};
    }
  
    create() {
      const initialCard = document.createElement('div');
      initialCard.innerHTML = `<div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>`;
  
      const initialCardImage = initialCard.querySelector('.place-card__image');
      const initialCardName = initialCard.querySelector('.place-card__name');
      initialCardImage.setAttribute('style', 'background-image: url(' + this.placeLink + ')');
      initialCardName.textContent = this.placeName;
  
      this.initialCard = initialCard.firstChild;
      return this.initialCard;
    }
  
    remove() {
     this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
     this.card.querySelector('.place-card__image').removeEventListener('click', this.imageOrDelete);
     this.card.parentNode.removeChild(this.card);
    }
  
    like(evt) {
      evt.target.classList.toggle('place-card__like-icon_liked');
    }
  
    popupCall() {
      const cardPopupContent =  `<div class="image-and-closebutton">
                                      <div class="popup_image">
                                      <img src="${this.placeLink}" alt="" class="image-size">
                                      </div>
                                      <img src="../images/close.svg" alt="" class="popup__close popup__close_image">
                                    </div>`;
      this.popupCard = new Popup(cardPopupContent);
    }
  }