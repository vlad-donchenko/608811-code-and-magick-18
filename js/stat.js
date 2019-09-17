'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;

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

    var histogramColor = 'hsl(235,' + Math.ceil(Math.random() * 100) + '%' + ', 27%)';

    if (names[i] === 'Вы') {
      histogramColor = 'rgba(255, 0, 0, 1)';
    }

    printText(ctx, CLOUD_X + HISTOGRAM_GAP + (HISTOGRAM_GAP + HISTOGRAM_WIDTH) * i, 100, '#000000', Math.ceil(times[i]));
    renderRectangle(ctx, CLOUD_X + HISTOGRAM_GAP + (HISTOGRAM_GAP + HISTOGRAM_WIDTH) * i, 100, HISTOGRAM_WIDTH, (HISTOGRAM_HEIGHT * Math.ceil(times[i])) / maxTime, histogramColor);
    printText(ctx, CLOUD_X + HISTOGRAM_GAP + (HISTOGRAM_GAP + HISTOGRAM_WIDTH) * i, HISTOGRAM_HEIGHT, '#000000', names[i]);
  }
};
