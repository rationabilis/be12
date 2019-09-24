"use strict";

/* Токен: 97536aad-2615-4e27-b54c-91daa47b4fd5
Идентификатор группы: cohort1 */

const placesList = document.querySelector('.places-list');
const newPlaceButton= document.querySelector('.user-info__button');
const userButton= document.querySelector('.edit-button');
const userNameHeader = document.querySelector('.user-info__name');
const aboutUserParagraph = document.querySelector('.user-info__job');

class Card {
  constructor(placeName, placeLink) {
    this.placeName = placeName;
    this.placeLink = placeLink;
    this.card = this.create();
    /* Вставить bind */
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
    /* Можно лучше: класс Card не должен знать куда вставляется карточка,
    так что лучше не использовать глобальную переменную, а написать так:
    const card = event.target.closest('.place-card');
    card.parentNode.removeChild(card)
    или так
     this.card.parentNode.removeChild(this.card)
    */

   this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
   this.card.querySelector('.place-card__image').removeEventListener('click', this.imageOrDelete);
   this.card.parentNode.removeChild(this.card);

    /*
      Можно лучше: при удалении карточки лучше также удалять обработчики событий
      с её элементов с помощью removeEventListener
    */
  }

  like(evt) {
    evt.target.classList.toggle('place-card__like-icon_liked');
  }

  popupCall() {
    const cardPopupContent =  `<div class="image-and-closebutton">
                                    <div class="popup_image">
                                    <img src="${this.placeLink}" alt="" class="image-size">
                                    </div>
                                    <img src="./images/close.svg" alt="" class="popup__close popup__close_image">
                                  </div>`;
    this.popupCard = new Popup(cardPopupContent);
  }
}

class CardList {
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
    const newCardPopupContent =  `<div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close popup__close_new-place">
        <h3 class="popup__title">Новое место</h3>
        <form class="popup__form" name="newplace">
            <input id="name" type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
            <span id="error-name" class="error-message">Это обязательное поле</span>
            <input id="link" type="url" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
            <span id="error-link" class="error-message">Это обязательное поле</span>
            <button class="button popup__button" disabled>+</button>
        </form>
      </div>`;
    this.newCard = new Popup(newCardPopupContent);

    this.formNewPlace = document.forms.newplace;
    this.formNewPlace.addEventListener('submit', event => this.onSubmitPlaceCard(event));
    this.name = document.querySelector('#name');
    this.link = document.querySelector('#link');
    this.name.addEventListener('input', validateInput);
    this.link.addEventListener('input', validateInput);

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

class Popup {
  constructor(popupContent) {
    this.popupContainer = document.querySelector('.popup');
    this.popupContainer.innerHTML = popupContent;
    this.open();
    const popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', event => this.close());
  }

  open() {
    this.popupContainer.classList.add('popup_is-opened');
  }

  close() {
    this.popupContainer.classList.remove('popup_is-opened');
    this.popupContainer.innerHTML = '';
  }
}

const cardList = new CardList(placesList, []);

class Api {
  constructor(options) {
    this.options = options;
  }

  getUserData() {
    const urlUserData = this.options.baseUrl + '/users/me';
    const headers = {headers: this.options.headers};

    fetch(urlUserData, headers)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        userNameHeader.textContent = res.name;
        aboutUserParagraph.textContent = res.about;
      })
      .catch((err) => {
        errorMessage(err); // вызов попап об ошибке
      });
    }

  editUserData(name, about) {
    const urlUserData = this.options.baseUrl + '/users/me';
    const methodsHeadersBody = {method: 'PATCH', headers: this.options.headers,
                                body: JSON.stringify({name: name, about: about})}

  return  fetch(urlUserData, methodsHeadersBody)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      errorMessage(err); // вызов попап об ошибке
      throw err;
    });

  }

  getInitialCards() {
    const urlCards = this.options.baseUrl + '/cards';
    const headers = {headers: this.options.headers};

    fetch(urlCards, headers)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        cardList.render(data);
      })
      .catch((err) => {
        errorMessage(err); // вызов попап об ошибке
      });
  };
}

const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort1',
  headers: {
    authorization: '97536aad-2615-4e27-b54c-91daa47b4fd5',
    'Content-Type': 'application/json'
  }
});

//Запуск прорисовки страницы
api.getUserData();
api.getInitialCards();

/* Функции валидации ввода*/
function validateInput(evt) {
  validateForm(evt.target.parentElement);
}

//Валидирует форму
function validateForm(form) {
  /* Можно лучше: не стоит обращаться к элементом формы через индекс, т.к.
  в форму могут добавиться новые поля и индексы элементов изменятся, также очень сложно
  разбирать такой код. Лучше использовать имя элемента
  или обращаться к элементу предварительно найдя его через querySelector
  Ответ: Понимаю, что можно лучше. Но валидируется две разные формы, которые появляются только при вызове попап.
  Попробую исправить после получения всех замечаний. Сейчас неочевидно, что была выбрана правильная концепция.
  Ее изменение повлечет измненение этой функции.
  */
  if (validateData (form.elements[0]) && validateData (form.elements[1]))
    {
      form.elements[2].removeAttribute('disabled');
      form.elements[2].classList.add('button__button_active');
    } else {
      form.elements[2].setAttribute('disabled', true);
      form.elements[2].classList.remove('button__button_active');
    }
}

/* Функции валидации введенных данных элемента*/
/* data.element */
function validateData(elem) {
  const errorElement = document.querySelector(`#error-${elem.id}`);

    if(elem.value.length == 0)
    {
      errorElement.textContent = 'Это обязательное поле';
      errorElement.classList.remove('error-message__hidden');
      return false;
    }
    else {

      if (isNotCorrectLinkInput(elem))
        {
          errorElement.textContent = 'Здесь должна быть ссылка';
          errorElement.classList.remove('error-message__hidden');
          return false;
        }

      if (isNotCorrectTextInput (elem))
        {
          errorElement.textContent = 'Должно быть от 2 до 30 символов';
          errorElement.classList.remove('error-message__hidden');
          return false;
        }
    errorElement.textContent = 'Это обязательное поле';
    errorElement.classList.add('error-message__hidden');
    return true;
      }
}

// Проверяет правильность ввода текста
function isNotCorrectTextInput (elem) {
  if ((elem.value.length < 2 || elem.value.length > 30) && elem.type == 'text') {
    return true;
  }
  return false;
}

// Проверяет правильность ввода ссылки
function isNotCorrectLinkInput (elem) {
  if (!elem.checkValidity() && elem.type == 'url') {
    return true;
  }
  return false;
}

/* Открывает форму для ввода данных новой карточки */
newPlaceButton.addEventListener('click', function() {
  cardList.popupCall();
});

/* Ввод данных пользователя */
userButton.addEventListener('click', function() {

  const userPopupContent = `<div class="popup__content">
  <img src="./images/close.svg" alt="" class="popup__close popup__close_user">
  <h3 class="popup__title">Редактировать профиль</h3>
  <form class="popup__form" name="user">
      <input id="username" type="text" name="username" class="popup__input popup__input_type_user-name" placeholder="Имя">
      <span id="error-username" class="error-message">Это обязательное поле</span>
      <input id="aboutuser" type="text" name="aboutuser" class="popup__input popup__input_type_about-user" placeholder="О себе">
      <span id="error-aboutuser" class="error-message">Это обязательное поле</span>
      <button class="button popup__button" disabled>+</button>
  </form>
</div>`;
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
    api.editUserData(userName.value, aboutUser.value)
    .then((res) => {
      userNameHeader.textContent = res.name;
      aboutUserParagraph.textContent = res.about;
      user.close();
    })

    /* Обратить внимание:
    * .close() очень желательно также разместить внутри цепочки промисов editUserData.
    * DOM операции в таких случаях необходимо размещать внутри цепочки промисов.
    * Это черевато тем, что попап закрывается до того момента, как выполнится запрос к серверу или наоборот.
    * ОТВЕТ: Я попробовал. Возникает ошибка. Видимо потому, что экземпляр класса user
    * создается при вызове попапа, в то время как экземпляр класса api создается при открытии
    * страницы. Надо ли создавать экземпляр класса api при каждом вызове попапа?
    *  */

    });
  /* Закрывает форму ввода данных пользователя */
  popupUserCloseButton.addEventListener('click', function() {user.close();});
});

/* Попап сообщения об ошибке */
function errorMessage(err) {
  const errorPopupContent = `<div class="popup__content">
  <img src="./images/close.svg" alt="" class="popup__close popup__close_user">
  <h3 class="popup__title">Внимание!</h3>
  <h3 class="popup__title">${err}</h3>
  </div>`;
  const error = new Popup(errorPopupContent);
}

/* Резюме по работе:
* Отлично, вы внесли исправление с лишним ГЕТ, теперь все работает корректно и сюрпризов не случится.
*
* Вы полностью реализовали обязательный функционал, работа принята.
*
* Над чем можно поработать:
*   1. Из очевидного - это поработать над дополнительным функционалом.
*   2. Почитать больше про промисы можно здесь:
*   https://medium.com/web-standards/%D0%BE%D0%B1%D0%B5%D1%89%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80%D0%BD%D0%BE%D0%B9-%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%B8%D0%BD%D0%BA%D0%B8-b0ed209809ab
*  https://davidwalsh.name/fetch
*  https://habr.com/ru/company/mailru/blog/269465/
*
*  Я желаю вам удачи на последующих спринтах, у вас все хорошо получается!
* */

/* Резюме по работе:
* В целом - работа отличная.
* Вы хорошо поработали над базовым функционалом и сделали все достаточно корректно.
* Учли большинство ситуация, где происходят операции с DOM и разместили их внутри цепочки промисов fetch API - это круто.
* Использован класс API - очень хорошо.
* Сами фетчи не содержат недостежимых учатсков кода и оформлены корректно.
*
* Что необходимо исправить: У вас присутствует один лишний GET отправке данных формы пользователя на сервер.
* Он является лишним, т.к сервер, согласно заданию, по умолчанию в ответе вернет вам новый объект с обновленными данными пользователя, который
* уже и можно будет использовать.
* Для для этого лишний ГЕТ - не совсем корректно.
*
* Также был добавлен комментарий, на который стоит обратить внимание, он касается закрытия формы окна редактирования профиля.
* Событие закрытия попапа стоит разместить внутри fetch.
* */


/*
   Задание выполнено, хорошая работа!

   Интересное решение с передачей в попап разметки его содержимого, хотя на мой взгляд лучше было бы
   сделать отдельные функции для создания DOM элементов и уже DOM элементы передвать в констрокутор попапа.
   Так же к недостатку стоит отнести, то, что класс попапа завязан на один DOM элемент
   через this.popupContainer = document.querySelector('.popup');
   Если захочется сделать два отновременно открытых попапа, то не получиться сделать,
   при создании попапа можно было создавать новый div с классом .popup и добавлять его на страницу,
   а при закрытии попапа удалять его

   Замечание по валидации формы
    - при открытии попапа редактирования профиля отображаются ошибки, хотя поля заполнены

  Спасибо за хорошую оценку и рекомендации.
  Формы исправил, а с popup потребуется серъезная переработка всего проекта.
  Я попробовал, но не успеваю с другими задачами к жесткому дэдлайну.
  Исправлю после сдачи  проекта.
*/
