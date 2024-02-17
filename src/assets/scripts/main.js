document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-validate');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const message = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if(checkInputs()) {
      showModal();
    }
  });
  name.addEventListener('input', () => {
    validateField(name, name.value.trim() !== '', 'Name cannot be blank');
  });
  
  email.addEventListener('input', () => {
    validateField(email, isEmail(email.value.trim()), 'Please put a E-mail valid');
  });

  phone.addEventListener('input', () => {
    validateField(phone, isPhone(phone.value.trim()), 'Not a valid Phone')
  });

  password.addEventListener('input', () => {
    validateField(password, password.value.trim().length >= 10, 'Password must be at least 10 characters');
  });

  message.addEventListener('input', () => {
    validateField(message, message.value.trim() !== '','Message cannot be blank');
  });

  function checkInputs() {
    let isValid = true;
    validateField(name, name.value.trim() !== '', 'Name cannot be blank');
    validateField(email, isEmail(email.value.trim()), 'Not a valid E-mail')
    validateField(phone, isPhone(phone.value.trim()), 'Not a valid Phone')
    validateField(password, password.value.trim().length >= 10, 'Password must be at least 10 characters');
    validateField(message, message.value.trim() !== '','Message cannot be blank');

    document.querySelectorAll('.form-control').forEach((control) => {
      if(control.classList.contains('error')) {
        isValid = false;
      }
    })
    return isValid;
  }


  function validateField(input, condition, errorMessage) {
    if(condition) {
      setSuccess(input);
    } else {
      setError(input, errorMessage);
    }
  }

  function setError(input, message) {
    const formControl = input.parentElement;
    const icon = formControl.querySelectorAll('.icon');
    formControl.className = 'form-control error';
    icon.className = 'icon fas fa-times-circle';
    input.placeholder = message;
  }
});
