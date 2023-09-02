const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const gender = document.getElementsByName('gender');
const promo = document.getElementById('promo');

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmailValid(email) {
	const atIndex = email.indexOf('@');
	if (atIndex !== -1) {
	  const domain = email.substring(atIndex + 1);
	  return domain === 'gmail.com';
	}
	return false;
  }

function isPhoneNumberValid(phoneNumber) {
  if (phoneNumber.charAt(0) !== '0') {
    return false;
  }
  const phoneNumberLength = phoneNumber.length;
  return phoneNumberLength >= 10 && phoneNumberLength <= 12;
}

function isGenderSelected(gender) {
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      return true;
    }
  }
  return false;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true; 

  if (username.value === '') {
    showError(username, 'Name is required');
    isValid = false; 
  } else {
    showSuccess(username);
  }

  if (password.value === '') {
    showError(password, 'Password is required');
    isValid = false;
  } else {
    showSuccess(password);
  }

  if (password2.value === '') {
    showError(password2, 'Please confirm your password');
    isValid = false;
  } else if (password.value !== password2.value) {
    showError(password2, 'Passwords do not match');
    isValid = false;
  } else {
    showSuccess(password2);
  }

  if (email.value === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!isEmailValid(email.value)) {
    showError(email, 'Email is not valid');
    isValid = false;
  } else {
    showSuccess(email);
  }

  if (phoneNumber.value === '') {
    showError(phoneNumber, 'Phone number is required');
    isValid = false;
  } else if (phoneNumber.value.charAt(0) !== '0') {
    showError(phoneNumber, 'Please enter a phone number starting with 0');
    isValid = false;
  } else if (!isPhoneNumberValid(phoneNumber.value)) {
    showError(phoneNumber, 'Phone number is not valid (must start with 0 and have 10 to 12 digits)');
    isValid = false;
  } else {
    showSuccess(phoneNumber);
  }

  if (!isGenderSelected(gender)) {
    showError(gender[0], 'Please select your gender');
    isValid = false;
  } else {
    showSuccess(gender[0]);
  }

  if (address.value === '') {
    showError(address, 'Address is required');
    isValid = false;
  } else {
    showSuccess(address);
  }

  if (!isValid) {
    return; 
  }

  if (!promo.checked) {
    alert('Please check this box if you want to receive interesting promo info from Go-Litech');
    return; 
  }

  showPopup();
  resetForm();
});

function isFormValid() {
  return (
    username.value !== '' &&
    password.value !== '' &&
    password2.value !== '' &&
    isEmailValid(email.value) &&
    isPhoneNumberValid(phoneNumber.value) &&
    isGenderSelected(gender) &&
    address.value !== '' &&
    promo.checked
  );
}

function showPopup() {
  alert('Registration successful!'); 
}

function resetForm() {
  form.reset();
}
