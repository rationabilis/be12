//Валидирует форму
import validateData from './validateData';

export default function validateForm(form) {

    if (validateData (form.elements[0]) && validateData (form.elements[1]))
      {
        form.elements[2].removeAttribute('disabled');
        form.elements[2].classList.add('button__button_active');
      } else {
        form.elements[2].setAttribute('disabled', true);
        form.elements[2].classList.remove('button__button_active');
      }
  }
  