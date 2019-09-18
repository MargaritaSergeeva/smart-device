'use strict';
var modalOpen = document.querySelector('.header-contacts__button');
var modal = document.querySelector('.modal');
var siteSections = document.querySelector('.site-sections');
var footerContacts = document.querySelector('.footer-contacts');
var isStorageSupport = true;
var storageName = '';
var storagePhone = '';
var storageMessage = '';

if (siteSections) {
  var siteSectionsTitle = siteSections.querySelector('.site-sections__title');
}

if (siteSections) {
  var footerContactsTitle = footerContacts.querySelector('.footer-contacts__title');
}

if (modal) {
  var modalClose = modal.querySelector('.feedback-form__close-button');
  var submitButton = modal.querySelector('button[type="submit"]');
  var form = modal.querySelector('form');
  var userName = modal.querySelector('#name');
  var userPhone = modal.querySelector('#tel');
  var userMessage = modal.querySelector('#text');
}

var onEscDown = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modal.classList.add('modal--hide');
    modal.classList.remove('modal--show');
    document.removeEventListener('keydown', onEscDown);
  }
};

var openModal = function () {
  modal.classList.remove('modal--hide');
  modal.classList.add('modal--show');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscDown);
};

var closeModal = function () {
  modal.classList.add('modal--hide');
  modal.classList.remove('modal--show');
  document.body.classList.remove('no-scroll');
  cleanInputs();
  document.removeEventListener('keydown', onEscDown);
};

var cleanInputs = function () {
  userName.value = '';
  userPhone.value = '';
  userMessage.value = '';
};

var getLocalData = function () {
  if (isStorageSupport) {
    if (storageName) {
      userName.value = storageName;
    }

    if (storagePhone) {
      userPhone.value = storagePhone;
    }

    if (storageMessage) {
      userMessage.value = storageMessage;
    }

    if (!storageName) {
      userName.focus();
    } else if (storageName && !storagePhone) {
      userPhone.focus();
    } else if (storageName && storagePhone && !storageMessage) {
      userMessage.focus();
    } else if (storageName && storagePhone && storageMessage) {
      submitButton.focus();
    }
  } else {
    userName.focus();
  }
};

var setLocalData = function () {
  if (userName.value) {
    localStorage.setItem('name', userName.value);
  }

  if (userPhone.value) {
    localStorage.setItem('tel', userPhone.value);
  }

  if (userMessage.value) {
    localStorage.setItem('text', userMessage.value);
  }
};

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('tel');
  storageMessage = localStorage.getItem('text');
} catch (err) {
  isStorageSupport = false;
}

if (modalOpen) {
  modalOpen.addEventListener('click', function () {
    openModal();
    getLocalData();
  });
}

if (modalClose) {
  modalClose.addEventListener('click', function () {
    closeModal();
  });
}

if (modal) {
  modal.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('modal')) {
      closeModal();
    }
  });
}

if (form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setLocalData();
  });
}

if (footerContactsTitle) {
  footerContacts.addEventListener('click', function () {
    if (footerContacts.classList.contains('footer-contacts--close')) {
      footerContacts.classList.remove('footer-contacts--close');
    } else {
      footerContacts.classList.add('footer-contacts--close');
    }
  });
}

if (siteSectionsTitle) {
  siteSections.addEventListener('click', function () {
    if (siteSections.classList.contains('site-sections--close')) {
      siteSections.classList.remove('site-sections--close');
    } else {
      siteSections.classList.add('site-sections--close');
    }
  });
}
