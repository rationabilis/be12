/* Функции валидации ввода*/

import validateForm from './validateForm';

export default function validateInput(evt) {
    validateForm(evt.target.parentElement);
  }