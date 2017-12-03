/**
 * BoardView.js -- Responsible for updating the view (DOM)
 */

 /**
  * @description View class for memory game board
  * @constructor
  * @param {Object} model - A reference to the view's model
  */

let BoardView = function(model) {
  // Instance variables
  this.$board = $('.deck');
  this.$cards = [];
  this.model = model;
};

BoardView.prototype.render = function(deck) {
  // Remove existing cards from board
  this.clearBoard();
  // Create element for each card in deck
  let cards = '';
  for (let index = 0; index < deck.length; index++) {
    cards += `${this.createCardElement(index)}\n`;
  }
  // Attach cards to DOM
  this.$board.append(cards);
};

BoardView.prototype.clearBoard = function() {
  this.$board.children().remove();
};

BoardView.prototype.createCardElement = function(index) {
  let element = 
`<li class="card" data-index="${index}">
  <i class="fa ${this.model.getCardFace(index)}"></i>
</li>`;

  return element;
};

BoardView.prototype.updateCards = function(indices) {
  for (index of indices) {
    this.updateCard(index);
  }
};

BoardView.prototype.updateCard = function(index) {
  let $cardElement = this.$board.children('.card:eq(' + index + ')');

  $cardElement.removeClass();
  $cardElement.addClass('card');

  if (this.model.cardMatched(index)) {
    $cardElement.addClass('match');
  } else if (this.model.cardFlipped(index)) {
    $cardElement.addClass('open show');
  }
};
