'use strict';
var PLAYERS_COUNT = 4;
var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
var wizards = [];
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var playersNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var playersSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatsColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

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
