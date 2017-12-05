/**
 * WinModalView.js -- Responsible for displaying the congratulations modal window
 */

 /**
  * @description View class for the congratulations modal window
  * @constructor
  * @param {Object} model - A reference to the view's model
  */
let WinModalView = function(model) {
  // Instance variables
  this.$modal = $('.win-modal');
  this.$moves = $('.modal-moves');
  this.$stars = $('.modal-stars');
  this.$timer = $('.modal-timer');
  this.model = model;
};

/**
 * @description Shows the congratulations modal
 */
WinModalView.prototype.show = function() {
  this.updateStats();
  this.$modal.css('display', 'flex');
};

/**
 * @description Hides the congratulations modal
 */
WinModalView.prototype.hide = function() {
  this.$modal.css('display', 'none');
};

/**
 * @description Updates the timer in the modal window
 * @param {string} time - The time elapsed since game start (mm:ss)
 */
WinModalView.prototype.updateTimer = function(time) {
  this.$timer.text(time);
};

/**
 * @description Updates the move counter and star rating in the modal window
 */
WinModalView.prototype.updateStats = function() {
  this.$moves.text(this.model.getMoves());
  this.$stars.text(this.model.getStarRating());
};
