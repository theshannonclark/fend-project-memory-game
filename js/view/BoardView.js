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
  this.model = model;
};

/**
 * @description Load cards elements into the DOM
 */
BoardView.prototype.render = function() {
  // Remove existing cards from board
  this.clearBoard();
  // Create an element for each card in deck
  let cards = '';
  let deckLength = this.model.count();
  for (let index = 0; index < deckLength; index++) {
    cards += `${this.createCardElement(index)}\n`;
  }
  // Attach cards to the DOM
  this.$board.append(cards);
};

/**
 * @description Removes all card elements from the DOM
 */
BoardView.prototype.clearBoard = function() {
  this.$board.children().remove();
};

/**
 * @description Creates a HTML element to represent a card
 * @param {number} index - The position of the card in the deck
 * @returns {string} The card as a HTML string
 */
BoardView.prototype.createCardElement = function(index) {
  let element = 
`<li class="card" data-index="${index}">
  <i class="fa ${this.model.getCardFace(index)}"></i>
</li>`;

  return element;
};

/**
 * @description Updates cards in the view (DOM) that have been modified in the model
 * @param {number[]} indices - The positions of all cards to be updated
 */
BoardView.prototype.updateCards = function(indices) {
  for (index of indices) {
    this.updateCard(index);
  }
};

/**
 * @description Updates a single card in the view (DOM)
 * @param {number} index - The position of the card in the deck
 */
BoardView.prototype.updateCard = function(index) {
  let $cardElement = this.$board.children(`[data-index=${index}]`);

  $cardElement.removeClass();
  $cardElement.addClass('card');

  if (this.model.cardMatched(index)) {
    $cardElement.addClass('match');
  } else if (this.model.cardFlipped(index)) {
    $cardElement.addClass('open show');
  } else if (this.model.cardMismatched(index)) {
    $cardElement.addClass('mismatch');
  }
};
