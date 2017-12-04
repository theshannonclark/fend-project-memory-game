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

WinModalView.prototype.show = function() {
  this.updateStats();
  this.$modal.css('display', 'flex');
};

WinModalView.prototype.hide = function() {
  this.$modal.css('display', 'none');
};

WinModalView.prototype.updateTimer = function(time) {
  this.$timer.text(time);
};

WinModalView.prototype.updateStats = function() {
  this.$moves.text(this.model.getMoves());
  this.$stars.text(this.model.getStarRating());
};