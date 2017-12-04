/**
 * Timer.js
 */

/**
 * @description Used to keep track of playing time
 * @constructor
 */

let Timer = function() {
  this.timerID = null;
  this.initialTime = Date.now();
};

Timer.prototype.initializeTimer = function(callback, newThis) {
  if (this.timerID !== null) {
    this.clearTimer();
  }
  this.timerID = window.setInterval(callback.bind(newThis), 1000);
};

Timer.prototype.elapsedTime = function() {
  return humanTime(Date.now() - this.initialTime);
};

Timer.prototype.clearTimer = function() {
  window.clearInterval(this.timerID);
  this.timerID = null;
};

function humanTime(milliseconds) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;

  let minutes = Math.floor(milliseconds / millisecondsPerMinute);
  let seconds = Math.floor((milliseconds % millisecondsPerMinute) / millisecondsPerSecond);

  return `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

function zeroPad(number, digits) {
  let numberString = Math.floor(number).toString();
  while (numberString.length < digits) {
    numberString = `0${numberString}`;
  }
  return numberString;
}
