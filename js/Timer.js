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

/**
 * @description Runs the callback function at a set interval
 * @param {function} callback - The function to run
 * @param {Object} newThis - Object to be bound to this in callback
 */
Timer.prototype.initializeTimer = function(callback, newThis) {
  // Prevent accidentally setting multiple timers
  if (this.timerID !== null) {
    this.clearTimer();
  }
  this.timerID = window.setInterval(callback.bind(newThis), 1000);
};

/**
 * @description Calculates the time that has passed since the timer started
 * @returns {string} The amount of time passed (mm:ss)
 */
Timer.prototype.elapsedTime = function() {
  return humanTime(Date.now() - this.initialTime);
};

/**
 * @description Stops the callback function from running
 */
Timer.prototype.clearTimer = function() {
  window.clearInterval(this.timerID);
  this.timerID = null;
};

/**
 * @description Converts milliseconds to minutes and seconds
 * @param {number} milliseconds
 * @returns {string} The amount of time passed (mm:ss)
 */
function humanTime(milliseconds) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;

  let minutes = Math.floor(milliseconds / millisecondsPerMinute);
  let seconds = Math.floor((milliseconds % millisecondsPerMinute) / millisecondsPerSecond);

  return `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

/**
 * @description Adds zeros to the start of number up to digits
 * @param {number} number
 * @param {number} digits - The number of zeros to add
 * @returns {string} - String version of number with zeros prepended
 */
function zeroPad(number, digits) {
  let numberString = Math.floor(number).toString();
  while (numberString.length < digits) {
    numberString = `0${numberString}`;
  }
  return numberString;
}
