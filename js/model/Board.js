/**
 * Board.js
 */

/**
 * @description Represents a game board
 * @constructor
 * @param {Object} controller - Reference to the GameController object
 */
let Board = function(controller) {
  // Instance variables
  this.moves = 0;
  this.flipped = [];
  this.matches = 0;
  this.controller = controller;

  this.createDeck();
};

/**
 * @description Creates an array of card objects, and shuffles them
 */
Board.prototype.createDeck = function() {
  const faces = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor','fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
  ];

  this.deck = [];
  for (let face of faces) {
    let card1 = {face: face, flipped: false, matched: false, mismatched: false};
    let card2 = {face: face, flipped: false, matched: false, mismatched: false};

    this.deck.push(card1, card2);
  }
  shuffle(this.deck);
};

/**
 * @description Flips a card, and checks for a match
 * @param {number} index - The position of the card in the deck to flip
 */
Board.prototype.flip = function(index) {
  // Flip the card, add its index to array of flipped cards
  this.deck[index].flipped = true;
  this.flipped.push(index);

  // If a card has already been flipped...
  if (this.flipped.length >= 2) {
    // if it matches with this card...
    if (this.getCardFace(this.flipped[0]) == this.getCardFace(this.flipped[1])) {
      // Set matched property of both cards to true
      this.matches++;
      this.deck[this.flipped[0]].matched = true;
      this.deck[this.flipped[1]].matched = true;

      // Play the matched card animation
      this.controller.updateCardView(this.flipped);
    } else { // if it doesn't match...
      // play mismatched animation for 1 second
      mismatchCards.call(this, this.flipped);
      window.setTimeout(unMismatchCards.bind(this), 1000, this.flipped);
    }
    this.flipped = [];

    this.moves++;
  } else {
    // Play the flipped card animation
    this.controller.updateCardView(this.flipped);
  }
};

/**
 * @description Checks if the player has won (all cards matched)
 * @returns {boolean} whether the player has won or not
 */
Board.prototype.won = function() {
  return this.matches == 8
};

/**
 * @returns {number} The number of cards in the deck
 */
Board.prototype.count = function() {
  return this.deck.length;
}

/**
 * @description Determines the star rating based on the number of moves
 * @returns {number} A number of stars indicating the players performance
 */
Board.prototype.getStarRating = function() {
  let rating = 1;
  if (this.moves <= 12) {
    rating = 3;
  } else if (this.moves <= 17) {
    rating = 2
  }
  return rating;
}

/**
 * @returns {number} The number of moves taken
 */
Board.prototype.getMoves = function() {
  return this.moves;
};

/**
 * @param {number} index - The position of the card in the deck
 * @returns {string} The symbol on the front of the card
 */
Board.prototype.getCardFace = function(index) {
  return this.deck[index].face;
};

/**
 * @param {number} index - The position of the card in the deck
 * @returns {boolean} Whether or not the card has been flipped
 */
Board.prototype.cardFlipped = function(index) {
  return this.deck[index].flipped;
};

/**
 * @param {number} index - The position of the card in the deck
 * @returns {boolean} Whether or not this card was matched to another card.
 */
Board.prototype.cardMatched = function(index) {
  return this.deck[index].matched;
};

/**
 * @param {number} index - The position of the card in the deck
 * @returns {boolean} Whether or not the card was mismatched
 */
Board.prototype.cardMismatched = function(index) {
  return this.deck[index].mismatched;
}

/**
 * @description Plays the mismatched animation on provided cards
 * @param {number[]} indices - Positions of the cards in the deck to play animation on
 */
function mismatchCards(indices) {
  for (let index of indices) {
    this.deck[index].flipped = false;
    this.deck[index].mismatched = true;
  }
  this.controller.updateCardView(indices);
}

/**
 * @description Sets the provided cards back to their unflipped state after being mismatched
 * @param {number[]} indices - Positions of the cards in the deck
 */
function unMismatchCards(indices) {
  for (let index of indices) {
    this.deck[index].mismatched = false;
  }
  this.controller.updateCardView(indices);
}
