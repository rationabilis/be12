import Popup from './popup';
import {cardList, userNameHeader, aboutUserParagraph} from './consts';



export default class Api {
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

      /* Попап сообщения об ошибке */
    errorMessage(err) {
      const errorPopupContent = `<div class="popup__content">
      <img src="../images/close.svg" alt="" class="popup__close popup__close_user">
      <h3 class="popup__title">Внимание!</h3>
      <h3 class="popup__title">${err}</h3>
      </div>`;
      const error = new Popup(errorPopupContent);
    };
  }




  