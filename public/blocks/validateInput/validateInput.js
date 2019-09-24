/* Функции валидации ввода*/

import validateForm from '../validateForm/validateForm';

export default function validateInput(evt) {
    validateForm(evt.target.parentElement);
  }