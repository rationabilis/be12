/* Функции валидации введенных данных элемента*/
/* data.element */
export default function validateData(elem) {
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