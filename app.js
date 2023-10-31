let gameSeq = []
let userSeq = []
let btns = ["yellow", "red", "purple", "green"]

let started = false;
let level = 0;

//step-1: kase bhi keypress karva thi game should start, level 1 should appear in h2, random box should flash
document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started");
        started = true;
    }
    levelUp();
})

let h2 = document.querySelector("h2");

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250)
}

function levelUp(){
    userSeq=[];  //reset after every level up
    level++;
    h2.innerText = `Level ${level}`;

    //random button flash
    let randIdx = Math.floor(Math.random()*4)  //random idx from 0-3
    let randCol = btns[randIdx];
    let randbtn = document.querySelector(`.${randCol}`)

    gameSeq.push(randCol);
    btnFlash(randbtn)
}


//step-2 - user button press and user button press karva par flash and checking both arrays
let allBtns = document.querySelectorAll(".btn");
function btnPress(){
    let btn = this;  //je press thayu
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor)
    checkAns(userSeq.length-1)
}

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function checkAns(idx){
    console.log(gameSeq);
    // console.log(userSeq);
    
    if(userSeq[idx]==gameSeq[idx]){ //2 cases - we are somewhere in the middle(d0 nothing) or we are checking the last element(banev arrays ni same length)
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}