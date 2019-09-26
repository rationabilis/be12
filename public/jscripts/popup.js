
export default class Popup {
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
