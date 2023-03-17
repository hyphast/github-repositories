import './style.scss'

const form = document.forms.search
form.noValidate = true

for (const field of form.elements) {
  field.addEventListener('invalid', function () {
    setFieldValidity(field)
  })

  field.addEventListener('input', function () {
    setFieldValidity(field)
  })
}

function setFieldValidity(field) {
  const validityState = field.validity

  if (!validityState.valid) {
    if (validityState.tooShort) {
      field.setCustomValidity('Запрос должен быть больше 1 символа!')
    } else if (validityState.valueMissing) {
      field.setCustomValidity('Это поле не должно быть пустым!')
    }

    getErrorElement(field).textContent = field.validationMessage
    field.setCustomValidity('')
  } else {
    getErrorElement(field).textContent = ''
  }
}

function getErrorElement(field) {
  const errorElementId = field.getAttribute('aria-describedby')
  return document.getElementById(errorElementId)
}
