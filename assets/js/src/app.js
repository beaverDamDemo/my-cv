( function() {
  "use strict";

  init();

  function init() {
    let s = Snap('#backgroundImage');
    Snap.load('assets/images/background-01.svg', onSVGLoaded);

    function onSVGLoaded(data) {
      s.append(data);
      animateBgr(data);
      animateMarbles();
    }

    function animateBgr(data) {
      let origColor = Snap.select('rect#bgr').attr('fill');
      let origLightColor = [
        Snap.select('#kandelaber #light').attr('fill'),
        Snap.select('#kandelaber #light-2').attr('fill')
      ];
      let duration = 16000;

      Snap.select('rect#bgr').animate({ 
        fill: "#333"
      }, duration);
      Snap.select('#kandelaber #light').animate({
        fill: '#8deff9'
      }, duration);
      Snap.select('#kandelaber #light-2').animate({
        fill: '#8deff9'
      }, duration);

      setTimeout(()=>{
        Snap.select('rect#bgr').animate({
          fill: origColor
        }, duration)
        Snap.select('#kandelaber #light').animate({
          fill: origLightColor[0]
        }, duration);
        Snap.select('#kandelaber #light-2').animate({
          fill: origLightColor[1]
        }, duration);
      }, duration);

      setTimeout(()=>{
        timeout();  
      }, 2*duration)
      
      function timeout() {
        setTimeout(function () {
            Snap.select('rect#bgr').animate({ 
              fill: "#333"
            }, duration);      
            setTimeout(()=>{
              Snap.select('rect#bgr').animate({
                fill: origColor
              }, duration)
            }, duration);
            timeout();
        }, 2*duration);
      }
    }
  }

  function animateMarbles() {
    let marblesCount = $('.marble').length; 
    // Draggable.create( $('.marble'));
    let complete = 0;

    for( let i=0; i<marblesCount; i++) {
      moveMarble(i, i*1);
    }

    function moveMarble(index, delay) {
      console.log(" index: ", index)

      let $this = $('.marble:nth-of-type('+(index+1)+')');
      var tl = new TimelineMax();
      let myDuration = 3;

      if( index == $('.marble').length-1 ) {
        let scale = 6.25;
        tl.to( $this, 1, {
          top: "+=650px",
          ease: Bounce.easeOut,
          delay: delay
        }, 0.2)
        // tl.to( $this, 0.6, {
        //   css: {
        //     borderRadius: 0,
        //     height: (1/scale*100)+"%",
        //     backgroundRepeat: "no-repeat"
        //   }
        // })
        tl.to( $this, myDuration, {
          css: {
            borderRadius: 0,
            height: (1/scale*100)+"%",
            backgroundRepeat: "no-repeat",
            scale: scale,
            left: "+=40px",
            top: "+=0px",
            transformOrigin: '50% 65%'
          },
          onComplete: replaceImg
        })

        function replaceImg() {
          // setTimeout(()=>{
            TweenMax.to('', 0, {
              delay: myDuration*1,
              onComplete: doActions
            })
            function doActions() {
              $('main').addClass('active');
              $('.marble__last').addClass('hidden');
              $('.closeButton').removeClass('hidden');
              $('#fontBtn').removeClass('hidden');
            }
          // }, (myDuration*1000))
        }
      } else {
        tl.to( $this, 1, {
          top: "+=650px",
          ease: Bounce.easeOut,
          delay: delay
        }, 0.25)
        .to( $this, 0.6, {
          left: "+=305px",
          rotation: "+=255",
          ease: Power1.easeOut,
          delay: 0.28
        })
        .to( $this, 0.2, {
          top: "+=105px",
          rotation: "+=45"
        })
        .to( $this, 1, {
          ease: Power4.easeIn,
          left: "+=500px",
          css: {
            scale: 0.5,
            left: "+=500px"
          }
        })        
      }
    }

    // var tl = new TimelineMax();
    // tl.staggerTo('.marble', 0.6, {
    //   top: "+=450px",
    //   ease: Bounce.easeOut,
    //   onComplete: moveLeft
    // }, 0.5)

    // function moveLeft() {
    //   complete++;
    //   if( complete != marblesCount) return;

    //   var tl = new TimelineMax();
    //   tl.staggerTo('.marble', 0.5, {
    //     left: "+=305px",
    //     rotation: "+=255",
    //     ease: Power0.easeIn,
    //     delay: 0.25
    //   }, 0.5);
    // }


    // tl.to('.marble__last', 1, {
    //   left: "+=300px",
    //   rotation: "+=300"
    // }, 4)
    // .add('firstReachedEnd')
    // tl.to('#second', 1, {
    //   left: "+=400px",
    //   rotation: "+=400"
    // }, 3)
    // tl.to('#third', 1, {
    //   left: "+=500px",
    //   rotation: "+=500"
    // }, 2)
      }


  // function loadAudio() {
  //   let queue = new createjs.LoadQueue();
  //   createjs.Sound.alternateExtensions = ["mp3"];
  //   queue.installPlugin(createjs.Sound);
  //   queue.on("complete", handleCompleteAudio);
  //   queue.on('error', handleErrorAudio);
  //   queue.loadFile({id:"introSound", src:instructions_audio });
  //   queue.loadFile({id:"congratulationsSound", src:congratulations_audio });
  //   queue.loadFile({id:"correct_audio", src:correct_audio });  
  // }

  // function handleCompleteAudio(e) {

  // }

  // window.handleAudio = function(audioFile) {
  //   createjs.Sound.play(audioFile);
  // };   

  // function handleErrorAudio(e) {
  //   console.warn("Error handling audio: ", e);
  // }

})();










