let gameSeq = [];
let userSeq = [];

let level = 0;
let highscore = 0;
let started = false;

let btns = ["yellow", "red", "green", "purple"];

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUp();
    }
});

function btnFls(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFls(btn) {
    btn.classList.add("userflash");
    
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    btnFls(randBtn);
}

function btnPress() {
    let btn = this;
    userFls(btn);
    
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    check(userSeq.length-1);
}

function check(idx) {
    if(gameSeq[idx] == userSeq[idx]) {
        if(gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to restart.`;
        document.querySelector(".red").classList.add("wrng");
        document.querySelector(".green").classList.add("wrng");
        document.querySelector(".yellow").classList.add("wrng");
        document.querySelector(".purple").classList.add("wrng");
        setTimeout(function() {
            document.querySelector(".red").classList.remove("wrng");
            document.querySelector(".green").classList.remove("wrng");
            document.querySelector(".yellow").classList.remove("wrng");
            document.querySelector(".purple").classList.remove("wrng");
        }, 150);
        if(level>highscore) {
                highscore = level; 
                h3.innerText = `Highscore is ${highscore}`;
        }
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset () {
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}
