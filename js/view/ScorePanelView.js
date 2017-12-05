/**
 * ScorePanelView.js -- Responsible for updating the move counter and star rating
 */

 /**
  * @description View class for the move counter and star rating
  * @constructor
  * @param {Object} model - A reference to the view's model
  */
let ScorePanelView = function(model) {
  // Instance variables
  this.$moves = $('.moves');
  this.$stars = $('.stars');
  this.$timer = $('.timer');
  this.model = model;
};

/**
 * @description Updates move counter and star rating
 */
ScorePanelView.prototype.render = function() {
  this.$moves.text(this.model.getMoves());

  this.clearStars();
  let rating = this.model.getStarRating();
  let stars = this.getStars(rating);
  this.$stars.append(stars);
};

/**
 * @description Updates the timer in the score panel
 * @param {string} time - Elapsed time since game start (mm:ss)
 */
ScorePanelView.prototype.updateTimer = function(time) {
  this.$timer.text(time);
}

/**
 * @description Removes star icons from the DOM
 */
ScorePanelView.prototype.clearStars = function() {
  this.$stars.children().remove();
};

/**
 * @description Converts the star rating into an array of star icons
 * @param {number} number - The star rating
 * @returns {string} A HTML string with 3 star icons
 */
ScorePanelView.prototype.getStars = function(number) {
  let numStars = (number >= 0 && number <= 3) ? number : 3;
  let stars = Array(numStars).fill(this.createStarElement('fa-star'));

  for (let i = numStars; i < 3; i++) {
    stars.push(this.createStarElement('fa-star-o'));
  }
  return stars.join("\n");
};

/**
 * @description Creates a HTML string representing a star icon
 * @param {string} type - The font-awesome class for the star icon you want
 * @returns {string}
 */
ScorePanelView.prototype.createStarElement = function(type) {
  return `<li><i class="fa ${type}"></i></li>`;
}
