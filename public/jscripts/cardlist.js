import Card from './card';
import Popup from './popup';
import validateForm from './validateForm';
import validateInput from './validateInput';
import {cardList, placesList, newPlaceButton, userButton, userNameHeader, aboutUserParagraph} from './consts';

export default class CardList {
    constructor(cardsContainer, cardsArray) {
      this.container = cardsContainer;
      this.cardsArray = cardsArray;
    }
  
    addCard(placeName, placeLink) {
      const newCard = new Card(placeName, placeLink);
      this.container.appendChild(newCard.card);
    }
  
    render(cardsArray) {
        cardsArray.forEach(function(elem) {
        cardList.addCard(elem.name, elem.link);
      });
    }
  
    popupCall() {
      const newCardPopupContent =  this.newCardPopupContentTemplate();
      this.newCard = new Popup(newCardPopupContent);
  
      this.formNewPlace = document.forms.newplace;
      this.formNewPlace.addEventListener('submit', event => this.onSubmitPlaceCard(event));
      this.name = document.querySelector('#name');
      this.link = document.querySelector('#link');
      this.name.addEventListener('input', validateInput);
      this.link.addEventListener('input', validateInput);
    }

    newCardPopupContentTemplate() {
      return `<div class="popup__content">
                <img src="../images/close.svg" alt="" class="popup__close popup__close_new-place">
                <h3 class="popup__title">Новое место</h3>
                <form class="popup__form" name="newplace">
                    <input id="name" type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
                    <span id="error-name" class="error-message">Это обязательное поле</span>
                    <input id="link" type="url" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
                    <span id="error-link" class="error-message">Это обязательное поле</span>
                    <button class="button popup__button" disabled>+</button>
                </form>
              </div>`;
    }
  
    // Добавляет новую карточку
    onSubmitPlaceCard(evt) {
      evt.preventDefault();
      this.addCard(this.name.value, this.link.value);
      this.formNewPlace.reset();
      validateForm(this.formNewPlace);
      this.newCard.close();
    }
  }