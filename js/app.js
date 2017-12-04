/**
 * app.js -- Main application script.
 */

/* 
  In a real application, it would probably be better to
  compile/minify all of these into one file, but I hope 
  doing it this way is OK for this project.
*/

// Getting weird XML parsing errors, even though
// they're script files...

$.getScript('js/model/Board.js');
$.getScript('js/model/Card.js');
$.getScript('js/view/BoardView.js');
$.getScript('js/view/ScorePanelView.js');
$.getScript('js/view/WinModalView.js');
$.getScript('js/utils.js');
$.getScript('js/Timer.js');
$.getScript('js/GameController.js')
  .done(function() {
    let gameController = new GameController();
  });