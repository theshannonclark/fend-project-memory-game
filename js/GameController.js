/**
 * GameController.js
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

  // When the player clicks on a non-flipped card...
  const $deck = $('.deck');
  $deck.on('click', 'li:not(.match):not(.open)', function(event) {
    // Set up the timer when the player clicks on the first card
    controllerThis.createTimer();

    // flip the card
    let cardIndex = event.target.dataset.index;
    controllerThis.board.flip(cardIndex);

    // update the move counter and star rating
    controllerThis.scorePanelView.render();

    // If this move has caused the player to win...
    if (controllerThis.board.won()) {
      // stop the timer, and display the time on the
      // 'congratulations' modal window
      controllerThis.timer.clearTimer();
      let elapsed = controllerThis.elapsedTime;
      controllerThis.winModalView.updateTimer(elapsed);

      // wait for animations to finish, then show modal
      window.setTimeout(function() {
        controllerThis.winModalView.show();
      }, 1000);
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

/**
 * @description Sets up the application state
 */
GameController.prototype.initialize = function() {
  // Instance variables
  this.board = new Board(this);
  this.boardView = new BoardView(this.board);
  this.scorePanelView = new ScorePanelView(this.board);
  this.winModalView = new WinModalView(this.board);

  // Render game board
  this.boardView.render();
  this.scorePanelView.render();
};

/**
 * @description Restarts the game with default values
 */
GameController.prototype.reset = function() {
  this.scorePanelView.updateTimer('00:00');
  this.timer.clearTimer();
  this.timer = undefined;
  this.initialize();
};

/**
 * @description Creates a timer and runs it
 */
GameController.prototype.createTimer = function () {
  if (this.timer === undefined) {
    this.timer = new Timer();
    this.timer.initializeTimer(tick, this);
  }
};

/**
 * @description Updates one or more cards in the DOM
 * @param {number[]} indices - The positions of updated cards in the deck
 */
GameController.prototype.updateCardView = function(indices) {
  this.boardView.updateCards(indices);
}

/**
 * @description Callback function for game timer
 */
function tick() {
  this.elapsedTime = this.timer.elapsedTime();
  this.scorePanelView.updateTimer(this.elapsedTime);
}
