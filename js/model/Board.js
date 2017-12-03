/**
 * Board.js -- Represents a game board
 */

/**
 * @description Represents a game board
 * @constructor
 */

let Board = function() {
  // Instance variables
  this.moves = 0;
  this.createDeck();
  this.flipped = [];
  this.matches = 0;
};

Board.prototype.createDeck = function() {
  const faces = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor','fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
  ];

  this.deck = [];
  for (let face of faces) {
    let card1 = {face: face, flipped: false, matched: false};
    let card2 = {face: face, flipped: false, matched: false};

    this.deck.push(card1, card2);
  }
  shuffle(this.deck);
};

Board.prototype.flip = function(index) {
  let result = [index];

  this.deck[index].flipped = true;
  this.flipped.push(index);

  if (this.flipped.length >= 2) {
    if (this.getCardFace(this.flipped[0]) == this.getCardFace(this.flipped[1])) {
      this.matches++;
      this.deck[this.flipped[0]].matched = true;
      this.deck[this.flipped[1]].matched = true;
    } else {
      this.deck[this.flipped[0]].flipped = false;
      this.deck[this.flipped[1]].flipped = false;
    }
    result = this.flipped;
    this.flipped = [];

    this.moves++;
  }

  return result;
};

Board.prototype.won = function() {
  return this.matches == 8
};

Board.prototype.getStarRating = function() {
  let rating = 1;
  if (this.moves <= 12) {
    rating = 3;
  } else if (this.moves <= 17) {
    rating = 2
  }
  return rating;
}

Board.prototype.getCardFace = function(index) {
  return this.deck[index].face;
};

Board.prototype.cardFlipped = function(index) {
  return this.deck[index].flipped;
};

Board.prototype.cardMatched = function(index) {
  return this.deck[index].matched;
};