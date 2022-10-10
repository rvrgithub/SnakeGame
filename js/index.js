let inputdir = { x: 0, y: 0 };
let foodSound = new Audio("../audio/foodAudio.wav");
let foodSound2 = new Audio("../audio/foodAutio1.mp3");
let gameOver = new Audio("../audio/gameOverAudio.mp3");
let bgAudio = new Audio("../audio/bgAudio.mp3");
let snakeSound = new Audio("../audio/snakeSoundAudio.wav");
let score = 0;
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let Score = document.querySelector("#scoreBox");
let HightScore = document.querySelector("#hightestScore");
let hightestScorevalue = 0;


// Game Fucntion
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log("ctime",ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  funGame();
}

// let box =document.getElementById("box");
function funGame() {
  // part_1 :: Updating the snake array & food...
  if (isCollide(snakeArr)) {
    gameOver.play();
    bgAudio.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game Over. Press any key to !!!.....");
    Score.innerHTML = "Score " + ":" + 0;
    snakeArr = [{ x: 13, y: 15 }];
    bgAudio.play();
    score = 0;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound2.play();
    bgAudio.play();
    score += 1;

    // hightest Score value.....
    if (score > hightestScorevalue) {
      console.log("score", score);
      hightestScorevalue = score;
      console.log("hightestScorevalue", hightestScorevalue);
      localStorage.setItem("hightestScore", JSON.stringify(hightestScorevalue));
      HightScore.innerHTML = "hightestScore:" + hightestScorevalue;
    }
    //
    Score.innerHTML = "Score " + ":" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });
    //  food between these number ...
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //  Moving the snake ....
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;
  // console.log("snakeArr", snakeArr);

  box.innerHTML = "";
  // part_2...............
  // display snake ...
  console.log("snakeArr", snakeArr);
  snakeArr.forEach((e, index) => {
    console.log("index", e.length);
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    }
    // else if(Math.max(index)){
    //   snakeElement.classList.add("snake_tail");
    // }
    else {
      snakeElement.classList.add("snake");
    }
    box.appendChild(snakeElement);
  });

  // display food ...
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  box.appendChild(foodElement);
}

// Main logic starts here
foodSound2.play();
let hisValue = localStorage.getItem("hightestScore");
console.log("hisValue", hisValue);
if (hisValue === null) {
  hightestScorevalue = 0;
  localStorage.setItem("hightestScore", JSON.stringify(hightestScorevalue));
} else {
  hightestScorevalue = JSON.parse(hisValue);
  HightScore.innerHTML = "hightestScore: " + hisValue;
}

bgAudio.play();

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 };
  foodSound.play();
  snakeSound.play();
  switch (e.key) {
    // ... ArrowUp key
    case "ArrowUp": {
      // console.log("ArrowUp")
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    }

    // ... ArrowDown key
    case "ArrowDown": {
      // console.log("ArrowDown")
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    }

    // ... ArrowLeft key
    case "ArrowLeft": {
      // console.log("ArrowLeft")
      inputdir.x = -1;
      inputdir.y = 0;
      break;
    }

    // ... ArrowRight key
    case "ArrowRight": {
      // console.log("ArrowRight")
      inputdir.x = 1;
      inputdir.y = 0;
      break;
    }
    default:
      break;
  }
});

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}
