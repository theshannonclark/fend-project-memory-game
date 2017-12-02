/**
 * GameController.js -- Mediator between the model and the view
 */

/**
 * @description Controller class for memory game
 * @constructor
 */

let GameController = function() {
  // Instance variables
  this.board = new Board();
  this.boardView = new BoardView();

  // Render game board
  this.boardView.render(this.board.deck);

  // Event listeners
  const $deck = $('.deck');
  $deck.on('click', 'li:not(.match):not(.open)', function() {
    alert('Card clicked');
  });
};