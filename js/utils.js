/**
 * Utils.js -- Miscellaneous utility functions
 */

/**
 * @description Shuffles an array in-place
 * @param {Array} array
 * @returns {Array} The shuffled array (for some reason)
 */
function shuffle(array) {
  // From http://stackoverflow.com/a/2450976
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
