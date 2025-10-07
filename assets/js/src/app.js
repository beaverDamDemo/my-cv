(function () {
  "use strict";

  const TIMING = {
    bgr: 9000,
    marbleDrop: 1,
    marbleSlide: 0.6,
    marbleSlideDelay: 0.28,
    marbleBounce: 0.2,
    marbleFade: 1,
    lastMarbleScale: 6.25,
    lastMarbleDuration: 2,
    closeButtonDelay: 3300,
  };

  const s = Snap("#backgroundImage");
  Snap.load("assets/images/background-01.svg", onSVGLoaded);

  function onSVGLoaded(data) {
    s.append(data);
    $("#loader").removeClass("active");
    $("#wrapper").removeClass("overlayed");
    animateBgr(data);
    animateMarbles();
  }

  function animateBgr(data) {
    const bgr = Snap.select("rect#bgr");
    const light1 = Snap.select("#kandelaber #light");
    const light2 = Snap.select("#kandelaber #light-2");
    const origColor = bgr.attr("fill");
    const origLightColor = [light1.attr("fill"), light2.attr("fill")];

    bgr.animate({ fill: "#333" }, TIMING.bgr);
    light1.animate({ fill: "#8deff9" }, TIMING.bgr);
    light2.animate({ fill: "#8deff9" }, TIMING.bgr);

    setTimeout(() => {
      bgr.animate({ fill: origColor }, TIMING.bgr);
      light1.animate({ fill: origLightColor[0] }, TIMING.bgr);
      light2.animate({ fill: origLightColor[1] }, TIMING.bgr);
    }, TIMING.bgr);

    setTimeout(startLoop, 2 * TIMING.bgr);

    function startLoop() {
      setTimeout(() => {
        bgr.animate({ fill: "#333" }, TIMING.bgr);
        setTimeout(() => {
          bgr.animate({ fill: origColor }, TIMING.bgr);
        }, TIMING.bgr);
        startLoop();
      }, 2 * TIMING.bgr);
    }
  }

  window.resetMarbles = function () {
    const $marbles = $(".marble");

    $marbles.each(function () {
      $(this).removeClass("hidden");
      TweenMax.to($(this), 0, {
        borderRadius: "50%",
        height: "128px",
        scale: "1",
        opacity: "1",
        left: "400px",
        top: "-150px",
      });
    });
  };

  window.animateMarbles = function () {
    const $marbles = $(".marble");

    $marbles.each(function (index) {
      moveMarble(index, index);
    });

    function moveMarble(index, delay) {
      const $this = $(`.marble:nth-of-type(${index + 1})`);
      const tl = new TimelineMax();

      if (index === $marbles.length - 1) {
        tl.to($this, TIMING.marbleDrop, {
          top: "+=652px",
          ease: Bounce.easeOut,
          delay,
        }).to($this, TIMING.lastMarbleDuration, {
          css: {
            borderRadius: 0,
            height: "136px",
            backgroundRepeat: "no-repeat",
            transform: `scale(${TIMING.lastMarbleScale})`,
            top: "372px",
            left: "+=10%",
            transformOrigin: "50% 50%",
          },
          onComplete: () => {
            $("main").addClass("active");
            $(".marble__last").addClass("last-marble-hiding");
            $(".closeButton").removeClass("hidden");
            $("#toggle-font-button").addClass("active");
          },
        });
      } else {
        tl.to($this, TIMING.marbleDrop, {
          top: "+=650px",
          ease: Bounce.easeOut,
          delay,
        })
          .to($this, TIMING.marbleSlide, {
            left: "+=305px",
            rotation: "+=255",
            ease: Power1.easeOut,
            delay: TIMING.marbleSlideDelay,
          })
          .to($this, TIMING.marbleBounce, {
            top: "+=105px",
            rotation: "+=45",
          })
          .to($this, TIMING.marbleFade, {
            ease: Power4.easeIn,
            css: {
              opacity: 0,
              left: "+=4px",
            },
          });
      }
    }
  };

  const $main = $("main");
  const $toggleFontButton = $("#toggle-font-button");
  const $marblesWrapper = $("#marblesWrapper");
  const $closeButton = $(".closeButton");
  const $monster = $(".monster");
  const $replayEnvelope = $(".replay-envelope");
  const $body = $("body");

  $closeButton.on("click", function () {
    $main.removeClass("active");
    $monster.addClass("active");
    $(this).addClass("hidden");
    $toggleFontButton.removeClass("active");
    $marblesWrapper.addClass("hidden");

    setTimeout(showReplayEnvelope, TIMING.closeButtonDelay);
  });

  function showReplayEnvelope() {
    $monster.removeClass("active");
    $replayEnvelope.addClass("active");
    if (typeof resetMarbles === "function") {
      resetMarbles();
    }
  }

  $toggleFontButton.on("click", function (e) {
    e.preventDefault();
    $toggleFontButton.toggleClass("selected-option-b");
    $body.toggleClass("font-mode");
  });

  $("#replay-button").on("click", function () {
    $replayEnvelope.removeClass("active");
    $marblesWrapper.removeClass("hidden");
    $toggleFontButton.removeClass("active hidden");
    $body.removeClass("font-mode");
    if (typeof animateMarbles === "function") {
      animateMarbles();
    }
  });
})();
