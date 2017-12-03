/**
 * GameController.js -- Mediator between the model and the view
 */

/**
 * @description Controller class for memory game
 * @constructor
 */

let GameController = function() {
  // Set up the board
  this.initialize();

  // Event listeners
  let controllerThis = this;

  const $deck = $('.deck');
  $deck.on('click', 'li:not(.match):not(.open)', function(event) {
    let cardIndex = event.target.dataset.index;
    let affectedCardsIndices = controllerThis.board.flip(cardIndex);
    controllerThis.boardView.updateCards(affectedCardsIndices);
  });

  const $restart = $('.restart');
  $restart.click(function(event) {
    // Recreate the board on restart
    controllerThis.initialize();
  });
};

GameController.prototype.initialize = function() {
  // Instance variables
  this.board = new Board();
  this.boardView = new BoardView(this.board);

  // Render game board
  this.boardView.render(this.board.deck);
};
