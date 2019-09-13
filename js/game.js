const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missHits = 0;

function round() {
 $("div.game-field").removeClass("target").text(""); // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).removeClass("miss");
  let showHits = hits + 1;
  $(divSelector).text(showHits);  // TODO: помечать target текущим номером

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("div.grid-wrapper").addClass("hidden-field")

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#missed-try").text(missHits);
  $("#win-message").removeClass("d-none");
  }

function handleClick(event) {
    if ((hits === 0) && (missHits === 0)) {firstHitTime = getTimestamp();}
    if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $("div.game-field").removeClass("miss");
    round();
  }
  else {
    missHits++;
    $(event.target).addClass("miss");
    round();
  }
 }

function init() {
  $("div.container").addClass("hidden-field")
  $("#button-start").click(function() {
    $("div.container").removeClass("hidden-field");
    $("#button-start").addClass("hidden-field");
    round();
  });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
