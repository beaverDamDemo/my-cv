(function () {
  "use strict";

  const $main = $("main");
  const $fontBtn = $("#fontBtn");
  const $marblesWrapper = $("#marblesWrapper");
  const $closeButton = $(".closeButton");
  const $monster = $(".monster");
  const $replayEnvelope = $(".replay-envelope");
  const $wrapperSections = $("#wrapper section");
  const $body = $("body");

  $closeButton.on("click", function () {
    $main.removeClass("active");
    $monster.addClass("active");
    $(this).addClass("hidden");
    $fontBtn.removeClass("active");
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

  $fontBtn.on("click", function (e) {
    e.preventDefault();
    $fontBtn.addClass("hidden");
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
