/**
    BoardView.js -- Responsible for updating the view (DOM)
 */

 /**
 * @description View class for memory game board
 * @constructor
 */

let BoardView = function() {
  // Instance variables
  this.$board = $('.deck');
  this.$cards = [];
};

BoardView.prototype.render = function(deck) {
  // Remove existing cards from board
  this.clearBoard();
  // Create element for each card in deck
  let cards = '';
  for (let card of deck) {
    cards += `${this.createCardElement(card)}\n`;
  }
  // Attach cards to DOM
  this.$board.append(cards);
};

BoardView.prototype.clearBoard = function() {
  this.$board.children().remove();
};

BoardView.prototype.createCardElement = function(face) {
  let element = 
`<li class="card">
  <i class="fa ${face}"></i>
</li>`;

  return element;
};