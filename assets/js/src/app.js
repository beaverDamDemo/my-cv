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
    const origColor = Snap.select("rect#bgr").attr("fill");
    const origLightColor = [
      Snap.select("#kandelaber #light").attr("fill"),
      Snap.select("#kandelaber #light-2").attr("fill"),
    ];
    const duration = 9000;

    Snap.select("rect#bgr").animate(
      {
        fill: "#333",
      },
      duration
    );
    Snap.select("#kandelaber #light").animate(
      {
        fill: "#8deff9",
      },
      duration
    );
    Snap.select("#kandelaber #light-2").animate(
      {
        fill: "#8deff9",
      },
      duration
    );

    setTimeout(() => {
      Snap.select("rect#bgr").animate(
        {
          fill: origColor,
        },
        duration
      );
      Snap.select("#kandelaber #light").animate(
        {
          fill: origLightColor[0],
        },
        duration
      );
      Snap.select("#kandelaber #light-2").animate(
        {
          fill: origLightColor[1],
        },
        duration
      );
    }, duration);

    setTimeout(() => {
      timeout();
    }, 2 * duration);

    function timeout() {
      setTimeout(function () {
        Snap.select("rect#bgr").animate(
          {
            fill: "#333",
          },
          duration
        );
        setTimeout(() => {
          Snap.select("rect#bgr").animate(
            {
              fill: origColor,
            },
            duration
          );
        }, duration);
        timeout();
      }, 2 * duration);
    }
  }

  window.resetMarbles = function () {
    const marblesCount = $(".marble").length;
    let complete = 0;

    for (let i = 0; i < marblesCount; i++) {
      let $this = $(".marble:nth-of-type(" + (i + 1) + ")");
      $this.removeClass("hidden");

      TweenMax.to($this, 0, {
        borderRadius: "50%",
        height: "128px",
        scale: "1",
        opacity: "1",
        left: "400px",
        top: "-150px",
      });
    }
  };
  window.animateMarbles = function () {
    const marblesCount = $(".marble").length;
    let complete = 0;

    for (let i = 0; i < marblesCount; i++) {
      moveMarble(i, i * 1);
    }

    function moveMarble(index, delay) {
      let $this = $(".marble:nth-of-type(" + (index + 1) + ")");
      var tl = new TimelineMax();
      let myDuration = 1;

      if (index == $(".marble").length - 1) {
        let scale = 6.25;
        /* the last marble*/
        tl.to(
          $this,
          1,
          {
            top: "+=652px",
            ease: Bounce.easeOut,
            delay: delay,
          },
          0.2
        ).to($this, 2, {
          css: {
            borderRadius: 0,
            height: "136px",
            backgroundRepeat: "no-repeat",
            scale: scale,
            top: "372px",
            left: "+=10%",
            transformOrigin: "50% 50%",
          },
          onComplete: replaceImg,
        });

        function replaceImg() {
          /* being replaced eventually by a DIV */
          /* todo: marble ni na sredini, zato kadar se scale-a in animira border-radius etc ..
          se ne postavi na pravilno left pozicijo. Treba bi z js preverit, koliko prostora ima
          last marble na voljo za se povecat, in potem na podlagi tega preracunat
          koliko naj se skalira in koliko naj se premakne left, top */
          $("main").addClass("active");
          $(".marble__last").addClass("last-marble-hiding");
          $(".closeButton").removeClass("hidden");
          $("#fontBtn").addClass("active");
          // }
        }
      } else {
        tl.to(
          $this,
          1,
          {
            top: "+=650px",
            ease: Bounce.easeOut,
            delay: delay,
          },
          0.25
        )
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
