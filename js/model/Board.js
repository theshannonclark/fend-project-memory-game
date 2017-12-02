/**
    Board.js -- Represents a game board
 */

/**
 * @description Represents a game board
 * @constructor
 */

let Board = function() {
  // Instance variables
  this.moves = 0;
  this.createDeck();
};

Board.prototype.createDeck = function() {
  this.deck = shuffle([
    'fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
  ]);
};