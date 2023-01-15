$(function () {
  let interval;
  let secondsTimer = 60;
  setTimeout(random, 2000);
  $("#check").prop("disabled", true);
  $("#check").addClass("disabled");
//.....................  Start game...................................
  $("#start").on("click", function () {
    $(this).prop("disabled", true);
    $(this).addClass("disabled");
    $("#check").prop("disabled", false);
    $("#check").removeClass("disabled");

    $(" .picture").draggable({
      revert: 'invalid',
      start: function () {
        if ($(this).hasClass("droppedPiece")) {
          $(this).removeClass("droppedPiece");
          $(this).parent().removeClass("piecePresent");
        }
      },
    });
    $(".pic").droppable({  
      accept: function () {
        return !$(this).hasClass("piecePresent");
      },
      drop: function (event, ui) {
        let draggableEl = ui.draggable;
        let droppedOn = $(this);
        droppedOn.addClass("piecePresent");
        $(draggableEl)
          .addClass("droppedPiece")
          .css({
            top: 0,
            left: 0,
            position: "relative",
          })
          .appendTo(droppedOn);
      },
    });

    $(this).attr("disabled", "true");

    clearInterval(interval);
    interval = setInterval(timer, 1000);
//............................  Timer function..................................
    function timer() {
      secondsTimer--;
      if (secondsTimer == 0) {
        clearInterval(interval);
        check();
      }
      if (secondsTimer >= 0 && secondsTimer < 10) {
        secondsTimer = "0" + secondsTimer;
      }
      $(".minutes").text(`00:`);
      $(".seconds").text(`${secondsTimer}`);
      $(".time-modal").text(`${secondsTimer}`);
    }
  });
//............................ Random appending of pictures......................
  function random() {
    let parent = $(".from-container");
    let divs = parent.children();
    while (divs.length) {
      parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  }
  //   New game
  $("#new").on("click", function () {
    location.reload();
  });
//................... Check game results .....................
  function check() {
    let num = $(".to-container .picture");
    let number2 = $(".to-container .pic");
    let check = true;
    if (num.length < 16) {
      check = false;
      $(".text").text(`It's a pity, but you lost`);
      $(".check-result").css({
        display: "flex",
        top: "90px",
      });
      $(".check-result").css(
        "left",
        (window.innerWidth - $(".check-result").width()) / 2
      ),
        $(".check-have-time").css("display", "none");
      clearInterval(interval);
    }
    if (num.length == 16) {
      for (let i = 1; i < num.length; i++) {
        for (let j = 1; j < number2.length; j++) {
          if (
            !(
              $(num[i]).attr("class").split(" ")[1] ===
              $(number2[i]).attr("class").split(" ")[1]
            )
          ) {
            check = false;

            $(".check-result").css({
              display: "flex",
              top: "90px",
              zIndex: "4",
            });
            $(".check-result").css(
              "left",
              (window.innerWidth - $(".check-result").width()) / 2
            ),
              $(".check-have-time").css("display", "none");
            clearInterval(interval);
          }
        }
      }
      if (check) {
        $(".text").text(`Woohoo, well done, you did it!`);
        $(".check-result").css({
          display: "flex",
          top: "90px",
          zIndex: "4",
        });
        $(".check-result").css(
          "left",
          (window.innerWidth - $(".check-result").width()) / 2
        ),
          $(".check-have-time").css("display", "none");
        clearInterval(interval);
      } else {
        $(".text").text(`It's a pity, but you lost`);
        $(".check-result").css({
          display: "flex",
          top: "90px",
          zIndex: "4",
        });
        $(".check-result").css(
          "left",
          (window.innerWidth - $(".check-result").width()) / 2
        ),
          $(".check-have-time").css("display", "none");
        clearInterval(interval);
      }
    }
  }
 // ................... button  on modal box....................................
  $("#close").on("click", function () {
    $(".check-have-time").css("display", "none");
  });
  $("#closeRes").on("click", function () {
    $(".check-result").css("display", "none");
  });

  $(".greenBtn").click(check);
  $("#check").on("click", function () {
    $(".check-have-time").css(
      "left",
      (window.innerWidth - $(".check-result").width()) / 2
    ),
      $(".check-have-time").css({
        display: "flex",
        top: "90px",
        zIndex: "4",
      });
  });
});
