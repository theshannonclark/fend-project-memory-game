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
    controllerThis.scorePanelView.render();

    if (controllerThis.board.won()) {
      let elapsed = controllerThis.elapsedTime;
      controllerThis.winModalView.updateTimer(elapsed);

      controllerThis.winModalView.show();
    }
  });

  const $restart = $('.restart');
  $restart.click(function(event) {
    controllerThis.reset();
  });

  const $modalRestart = $('.continue-button');
  $modalRestart.click(function(event) {
    event.preventDefault();
    controllerThis.reset();
    controllerThis.winModalView.hide();
  });
};

GameController.prototype.initialize = function() {
  // Instance variables
  this.board = new Board();
  this.boardView = new BoardView(this.board);
  this.scorePanelView = new ScorePanelView(this.board);
  this.winModalView = new WinModalView(this.board);

  // Set up the timer
  this.timer = new Timer();
  this.timer.initializeTimer(tick, this);

  // Render game board
  this.boardView.render();
  this.scorePanelView.render();
};

GameController.prototype.reset = function() {
  this.scorePanelView.updateTimer('00:00');
  this.timer.clearTimer();
  this.initialize();
};

function tick() {
  this.elapsedTime = this.timer.elapsedTime();
  this.scorePanelView.updateTimer(this.elapsedTime);
}
