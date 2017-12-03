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
  this.model = model;
};

ScorePanelView.prototype.render = function(moves) {
  this.$moves.text(moves);

  this.clearStars();

  let stars = '';
  if (moves <= 16) {
    stars = this.getStars(3);
  } else if (moves <= 24) {
    stars = this.getStars(2);
  } else {
    stars = this.getStars(1);
  }
  this.$stars.append(stars);
};

ScorePanelView.prototype.clearStars = function() {
  this.$stars.children().remove();
};

ScorePanelView.prototype.getStars = function(number) {
  let numStars = (number >= 0 && number <= 3) ? number : 3;
  let stars = Array(numStars).fill(this.createStarElement('fa-star'));
  for (let i = numStars; i < 3; i++) {
    stars.push(this.createStarElement('fa-star-o'));
  }

  return stars.join("\n");
};

ScorePanelView.prototype.createStarElement = function(type) {
  return `<li><i class="fa ${type}"></i></li>`;
}
