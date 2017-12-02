/**
    GameController.js -- Mediator between the model and the view
 */

/**
 * @description Controller class for memory game
 * @constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 */

let GameController = function() {
  // Instance variables
  this.board = new Board();
  this.boardView = new BoardView();

  // Set up game board
  this.boardView.render(this.board.deck);

  // Event listeners
  const $deck = $('.deck');
  $deck.on('click', 'li:not(.match):not(.open)', function() {
    alert('Card clicked');
  });
};