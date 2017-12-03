/**
 * BoardView.js -- Responsible for updating the view (DOM)
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
  for (let index = 0; index < deck.length; index++) {
    cards += `${this.createCardElement(deck[index], index)}\n`;
  }
  // Attach cards to DOM
  this.$board.append(cards);
};

BoardView.prototype.clearBoard = function() {
  this.$board.children().remove();
};

BoardView.prototype.createCardElement = function(face, index) {
  let element = 
`<li class="card" data-index="${index}">
  <i class="fa ${face}"></i>
</li>`;

  return element;
};