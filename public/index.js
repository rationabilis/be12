"use strict";

/* import praktikantInfo from './jscripts/praktikantInfo'; */

import Popup from './jscripts/popup';
import validateData from './jscripts/validateData';
import validateInput from './jscripts/validateInput';
import {cardList, newPlaceButton, userButton, userNameHeader, aboutUserParagraph} from './jscripts/consts';
import './images/avatar.jpg';
import './images/close.svg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/logo.svg';
import './images/trash-icon.svg';
import Api from './jscripts/api';


const praktikantInfo = {
  baseUrl: 'https://praktikum.tk/cohort1',
  headers: {
    authorization: '97536aad-2615-4e27-b54c-91daa47b4fd5',
    'Content-Type': 'application/json'
  }
};

const api = new Api(praktikantInfo);

//Запуск прорисовки страницы
api.getUserData();
api.getInitialCards();


/* Открывает форму для ввода данных новой карточки */
newPlaceButton.addEventListener('click', function() {
  cardList.popupCall();
});

/* Ввод данных пользователя */
userButton.addEventListener('click', userButtonClick);

function userButtonClick() {

  const userPopupContent = userPopupContentTemplate();
  const user = new Popup(userPopupContent);
  const formUser = document.forms.user;
  const userName = document.querySelector('#username');
  const aboutUser = document.querySelector('#aboutuser');
  const popupUserCloseButton = document.querySelector('.popup__close_user');

    /* Считываем исходные значения профиля*/
  userName.value = userNameHeader.textContent;
  aboutUser.value = aboutUserParagraph.textContent;
  validateData(userName);
  validateData(aboutUser);

    /* Считываем данные профиля из формы*/
  userName.addEventListener('input', validateInput);
  aboutUser.addEventListener('input', validateInput);


    /* Принимает данные формы */
  formUser.addEventListener('submit', function (evt) {
    evt.preventDefault();
      api.editUserData(userName.value, aboutUser.value) /* При выносе функции возникает ошибка userName not defined*/
      .then((res) => {                                   /* из-за того, что форма ввода формируется при вызове */
        userNameHeader.textContent = res.name;
        aboutUserParagraph.textContent = res.about;
        user.close();
      })

    });

  /* Закрывает форму ввода данных пользователя */
  popupUserCloseButton.addEventListener('click', function() {user.close();});}

function userPopupContentTemplate() {
  return `<div class="popup__content">
  <img src="../images/close.svg" alt="" class="popup__close popup__close_user">
  <h3 class="popup__title">Редактировать профиль</h3>
  <form class="popup__form" name="user">
      <input id="username" type="text" name="username" class="popup__input popup__input_type_user-name" placeholder="Имя">
      <span id="error-username" class="error-message">Это обязательное поле</span>
      <input id="aboutuser" type="text" name="aboutuser" class="popup__input popup__input_type_about-user" placeholder="О себе">
      <span id="error-aboutuser" class="error-message">Это обязательное поле</span>
      <button class="button popup__button" disabled>+</button>
  </form>
</div>`;
};




