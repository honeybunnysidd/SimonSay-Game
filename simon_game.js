let gameSeq = [];
let userSeq = [];

let start = false;
let level = 0;
let highScore = level;

let btns = ["red", "green", "yellow", "blue"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;

    startbtnSound();
    setTimeout(levelUp, 700);
  }
});
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // Store of Game Seq
  gameSeq.push(randColor);
  console.log(gameSeq);
  // Flash
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

// User Input

function userFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
  btnSound();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  userFlash(this);
  // Store of User Seq
  userSeq.push(this.getAttribute("id"));

  // User input done, now check it with gameSeq
  checkAns(userSeq.length - 1);
}

let para = document.createElement("p");
document.querySelector(".container").appendChild(para);
para.innerText = `High Score :`;

function checkAns(idx) {
  if (userSeq[idx] !== gameSeq[idx]) {
    h3.innerHTML = `Game Over! Your Score is <b>${
      level - 1
    }</b><br>Press any key to Start<br>`;

    //Adding high score
    if (level > highScore) {
      para.innerText = `High Score: ${level - 1}`;
    }
    gameOverSound();
    reset();
  } else if (userSeq.length === gameSeq.length) {
    setTimeout(levelUp, 600);
  }
}

function reset() {
  start = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

//Adding High Score

function updateHighScore() {
  if (level > highScore) {
    highScore = level;
  }
}

//sound effect--------------------------
let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
  endSound.play();
};
let btnsSound = document.querySelector(".btnSound");
let btnSound = function () {
  btnsSound.play();
};
let sbtnSound = document.querySelector(".sbtnSound");
let startbtnSound = function () {
  sbtnSound.play();
};
