'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var TEXT_HEIGHT = 16;

var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_GAP = 50;

var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || 'black';
  ctx.fillRect(x, y, width, height);
};

var printText = function (ctx, x, y, color, text) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.3)');
  renderRectangle(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');
  printText(ctx, 120, 40, '#000000', 'Ура вы победили!');
  printText(ctx, 120, 60, '#000000', 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var horizontalOffset = CLOUD_X + HISTOGRAM_GAP + (HISTOGRAM_GAP + HISTOGRAM_WIDTH) * i;
    var histagramHeight = Math.round((HISTOGRAM_HEIGHT * times[i]) / maxTime);
    var histogramColor = (names[i] === 'Вы') ? histogramColor = 'rgba(255, 0, 0, 1)' : 'hsl(235,' + Math.round(Math.random() * 100) + '%' + ', 27%)';

    printText(ctx, horizontalOffset, (CLOUD_HEIGHT + CLOUD_Y) - (histagramHeight + TEXT_HEIGHT * 3), '#000000', Math.round(times[i]));
    renderRectangle(ctx, horizontalOffset, CLOUD_Y + CLOUD_HEIGHT - 2 * TEXT_HEIGHT, HISTOGRAM_WIDTH, -(histagramHeight), histogramColor);
    printText(ctx, horizontalOffset, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT, '#000000', names[i]);
  }
};
