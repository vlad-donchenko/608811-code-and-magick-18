'use strict';
var PLAYERS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
setupSimilar.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
var wizards = [];
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var playersNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var playersSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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


var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var getPlayer = function () {
  return {
    'name': playersNames[randomInteger(0, playersNames.length - 1)] + ' ' + playersSurnames[randomInteger(0, playersSurnames.length - 1)],
    'coatColor': coatsColors[randomInteger(0, coatsColors.length - 1)],
    'eyesColor': eyesColors[randomInteger(0, eyesColors.length - 1)],
  };
};

var getWizardTemplate = function (object) {
  var item = wizardTemplate.cloneNode(true);
  var itemPlayerName = item.querySelector('.setup-similar-label');
  itemPlayerName.textContent = object.name;
  var itemCoatColor = item.querySelector('.wizard-coat');
  itemCoatColor.setAttribute('fill', object.coatColor);
  var itemEyesColor = item.querySelector('.wizard-eyes');
  itemEyesColor.setAttribute('fill', object.eyesColor);
  setupSimilarList.appendChild(item);
};

for (var i = 0; i < PLAYERS_COUNT; i++) {
  wizards.push(getPlayer());
  getWizardTemplate(wizards[i]);
}


var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name')) {
    setup.classList.add('hidden');
  }
};

var openModal = function () {
  setup.classList.remove('hidden');
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
