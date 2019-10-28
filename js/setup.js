'use strict';

(function () {
  var PLAYERS_COUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  setupSimilar.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var coatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballsColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var wizardCoatColorInput = setup.querySelector('.wizard-coat-color');
  var wizardCoatElement = setup.querySelector('.wizard-coat');
  var wizardEyesColorElement = setup.querySelector('.wizard-eyes');
  var wizardEyesColorInput = setup.querySelector('.wizard-eyes-color');
  var wizardFireballColorElement = setup.querySelector('.setup-fireball-wrap');
  var wizardFireballColorInput = setup.querySelector('.wizard-fireball-color');
  var colorCount = 1;
  var setupDefoltTop = window.getComputedStyle(setup, null).getPropertyValue('top');
  var setupDefoltLeft = window.getComputedStyle(setup, null).getPropertyValue('left');
  var form = setup.querySelector('.setup-wizard-form');

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getWizardTemplate = function (object) {
    var item = wizardTemplate.cloneNode(true);
    var itemPlayerName = item.querySelector('.setup-similar-label');
    itemPlayerName.textContent = object.name;
    var itemCoatColor = item.querySelector('.wizard-coat');
    itemCoatColor.setAttribute('fill', object.colorCoat);
    var itemEyesColor = item.querySelector('.wizard-eyes');
    itemEyesColor.setAttribute('fill', object.colorEyes);
    setupSimilarList.appendChild(item);
  };

  var renderWizard = function (array) {
    for (var i = 0; i < PLAYERS_COUNT; i++) {
      getWizardTemplate(array[i]);
    }
  };

  window.backend.load(renderWizard, onError);

  var onModalEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name')) {
      setup.classList.add('hidden');
    }
  };

  var openModal = function () {
    setup.classList.remove('hidden');
    setup.style.top = setupDefoltTop;
    setup.style.left = setupDefoltLeft;
    document.addEventListener('keydown', onModalEscPress);
  };

  var closeModal = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openModal();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openModal();
    }
  });

  setupClose.addEventListener('click', function () {
    closeModal();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeModal();
    }
  });

  var onCoatColorClick = function (element, input, colors) {
    var color = colors[colorCount];
    colorCount++;
    input.value = color;

    if (element !== wizardFireballColorElement) {
      element.style.fill = color;
    } else {
      element.style.backgroundColor = color;
    }

    if (colorCount === colors.length) {
      colorCount = 0;
    }
  };

  wizardCoatElement.addEventListener('click', function () {
    onCoatColorClick(wizardCoatElement, wizardCoatColorInput, coatsColors);
  });

  wizardEyesColorElement.addEventListener('click', function () {
    onCoatColorClick(wizardEyesColorElement, wizardEyesColorInput, eyesColors);
  });

  wizardFireballColorElement.addEventListener('click', function () {
    onCoatColorClick(wizardFireballColorElement, wizardFireballColorInput, fireballsColors);
  });

  var onCloseSetupSubmit = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onCloseSetupSubmit, onError);
    evt.preventDefault();
  });

  window.setup = {
    setup: setup,
  };

})();
