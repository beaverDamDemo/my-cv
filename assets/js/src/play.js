(function () {
  "use strict";

  const $main = $("main");
  const $changeFontButton = $("#change-font-button");
  const $marblesWrapper = $("#marblesWrapper");
  const $closeButton = $(".closeButton");
  const $monster = $(".monster");
  const $replayEnvelope = $(".replay-envelope");
  const $body = $("body");

  $closeButton.on("click", function () {
    $main.removeClass("active");
    $monster.addClass("active");
    $(this).addClass("hidden");
    $changeFontButton.removeClass("active");
    $marblesWrapper.addClass("hidden");

    setTimeout(showReplayEnvelope, 3300);
  });

  function showReplayEnvelope() {
    $monster.removeClass("active");
    $replayEnvelope.addClass("active");
    if (typeof resetMarbles === "function") {
      resetMarbles();
    }
  }

  $changeFontButton.on("click", function (e) {
    e.preventDefault();
    $changeFontButton.addClass("hidden");
    $body.addClass("font-mode");
  });

  $("#replay-button").on("click", function () {
    $replayEnvelope.removeClass("active");
    $marblesWrapper.removeClass("hidden");
    if (typeof animateMarbles === "function") {
      animateMarbles();
    }
  });
})();
