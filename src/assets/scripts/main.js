  // Carregamento & analise total da DOM //
document.addEventListener('DOMContentLoaded', function () { 
  // Definição de uma variavel constante, recebendo um identificador referente a cada input de nosso formulario //
  const form = document.getElementById('form-validate');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const repassword = document.getElementById('re-password');
  const message = document.getElementById('message');
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  // Adicionando um evento de submit, array funct com um paramentro de (e) == event parametro, Prevenção do parametro utilizando o method preventDefault(), verificação nos imput se estiver tudo certo, um modal será aberto // 
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if(checkInputs()) {
      showModal();
    }
  });
  // 
  name.addEventListener('input', () => {
    validateField(name, name.value.trim().length >= 10,'Name cannot be blank');
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

  repassword.addEventListener('input', () => {
    validateField(repassword, repassword.value === password.value & repassword.value.trim().length >= 10, 'Repassword is need the same password !');
  })

  message.addEventListener('input', () => {
    validateField(message, message.value.trim() !== '','Message cannot be blank');
  });
  // Esta função ira verificar nossos inputs, validando os valores inseridos nos campos disponíveis
  function checkInputs() {
    let isValid = true;
    validateField(name, name.value.trim() !== '', 'Name cannot be blank');
    validateField(email, isEmail(email.value.trim()), 'Not a valid E-mail')
    validateField(phone, isPhone(phone.value.trim()), 'Not a valid Phone')
    validateField(password, password.value.trim().length >= 10, 'Password must be at least 10 characters');
    validateField(repassword, repassword.value.trim().length >= 10, 'Re-password must be at least 10 characters');
    validateField(message, message.value.trim() !== '','Message cannot be blank');
    // Nessa verificação buscamos a class form-control adicionamos um loop, definimos o nome do evento como control. Então realizamos a verificação de nosso parametro que está verificando se existe uma class ERROR, quando existir ela retornará false, quando não existir ela ira retornar true
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
    const icon = formControl.querySelector('.icon');
    formControl.className = 'form-control error';
    icon.className = 'icon fas fa-times-circle';
    input.placeholder = message;
  }
  function setSuccess(input) {
    const formControl = input.parentElement;
    const icon = formControl.querySelector('.icon');
    formControl.className = 'form-control success';
    icon.className = 'icon fas fa-check-circle';
  }
  function isEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
  }
  function isPhone(phone) {
    return /^\+?(\d.*){3,}$/.test(phone);
  }
  function showModal() {
    const modal = document.getElementById('modal-success');
    modal.style.display = 'block';
    const closeBtn = document.querySelector('.close-button');
    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };
    window.onclick = function (event) {
      if(event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
});
