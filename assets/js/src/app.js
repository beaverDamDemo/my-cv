(function () {
  "use strict";

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
    const duration = 9000;

    bgr.animate({ fill: "#333" }, duration);
    light1.animate({ fill: "#8deff9" }, duration);
    light2.animate({ fill: "#8deff9" }, duration);

    setTimeout(() => {
      bgr.animate({ fill: origColor }, duration);
      light1.animate({ fill: origLightColor[0] }, duration);
      light2.animate({ fill: origLightColor[1] }, duration);
    }, duration);

    setTimeout(startLoop, 2 * duration);

    function startLoop() {
      setTimeout(() => {
        bgr.animate({ fill: "#333" }, duration);
        setTimeout(() => {
          bgr.animate({ fill: origColor }, duration);
        }, duration);
        startLoop();
      }, 2 * duration);
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
        const scale = 6.25;

        tl.to($this, 1, {
          top: "+=652px",
          ease: Bounce.easeOut,
          delay,
        }).to($this, 2, {
          css: {
            borderRadius: 0,
            height: "136px",
            backgroundRepeat: "no-repeat",
            transform: `scale(${scale})`,
            top: "372px",
            left: "+=10%",
            transformOrigin: "50% 50%",
          },
          onComplete: () => {
            $("main").addClass("active");
            $(".marble__last").addClass("last-marble-hiding");
            $(".closeButton").removeClass("hidden");
            $("#change-font-button").addClass("active");
          },
        });
      } else {
        tl.to($this, 1, {
          top: "+=650px",
          ease: Bounce.easeOut,
          delay,
        })
          .to($this, 0.6, {
            left: "+=305px",
            rotation: "+=255",
            ease: Power1.easeOut,
            delay: 0.28,
          })
          .to($this, 0.2, {
            top: "+=105px",
            rotation: "+=45",
          })
          .to($this, 1, {
            ease: Power4.easeIn,
            css: {
              opacity: 0,
              left: "+=4px",
            },
          });
      }
    }
  };
})();
