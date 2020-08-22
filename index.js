let gachiNames = ["van", "billy", "steve", "brad"];
let playerChosenButton = [];
let gameArray = [];
let level = 0;
let started = false;

$("body").keydown(function() {
  if(!started) {
    $("h2").text("Dungeon Level " + level);
    newSequence();
    started = true;
  }
});

function newSequence() {
  let randomButton = Math.floor(Math.random() * 4);
  let userChoice = gachiNames[randomButton];
  $("body").removeClass("game-over");

  playerChosenButton = [];
  gameArray.push(userChoice);
  buttonPressAnimation(userChoice);
  playAudio(userChoice);

  level++;
  $("h2").text("Dungeon Level " + level);
}

function checkUserAnswer(currentLevel){
  if(playerChosenButton[currentLevel] === gameArray[currentLevel]){
    if(playerChosenButton.length === gameArray.length) {
      setTimeout(function(){
        newSequence();
      },1300)
    }
  } else {
    setTimeout(function() {
      $("h2").text("Game Over");
    },300);

    $("body").addClass("game-over")
    let audio = new Audio("sound/Fuck you.mp3");
    checkHighScore();
    audio.play();
    gameReset();
  }
}

function gameReset() {
  level = 0;
  started = false;
  gameArray = [];
}

function buttonPressAnimation(currentButton) {
  $("#" + currentButton).css("background-image", "url(images/" + currentButton + ".png");

  setTimeout(function() {
    $("#" + currentButton).css("background-image", "none");
  },300);
}

function playAudio(name) {
  let audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

function checkHighScore() {
  let score = localStorage.getItem("highScore");
  if(level > score) {
    localStorage.setItem("highScore", level);
    setTimeout(function() {
      $("h2").text("New High Score!");
      if(score === null) {
        score = 0
      } else {
        $("h4").text("Last High Score: " + score);
      }
      let audio = new Audio("sound/celebrate.mp3");
      audio.play();
    },2300);
  }
}

$(".btn").click(function(event) {
  playerChosenButton.push(event.target.id);
  buttonPressAnimation(event.target.id);
  playAudio(event.target.id);
  checkUserAnswer(playerChosenButton.length -1);
});