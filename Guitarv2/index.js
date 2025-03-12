const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const fretPressed = [false , false , false , false];
const frets = [150 , 300 , 450 , 600];
const fretHeight = 20;
const fretWidth = 100;
const notes = [];
let score = 0;
let gameOver = false;
let speedMultiplier = 1; 

function drawFrets() {
    ctx.fillStyle = "white";
    frets.forEach((x , index) => {
        ctx.fillStyle = fretPressed[index] ? "white" : "gray";
        ctx.fillRect(x - fretWidth / 2 , canvas.height - 50 , fretWidth , fretHeight);
    });
}

function drawScoreBoard() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score : " + score , 20 , 30);
    ctx.fillText("Speed : " + speedMultiplier.toFixed(1) , 20 , 90);

    if (gameOver === true) {  
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER!", canvas.width / 2 - 120, canvas.height / 2);
    }
}


class Note {
    constructor(x , speed)
    {
        this.x = x - fretWidth / 2;
        this.y = 0;
        this.width = fretWidth;
        this.height = 20;
        this.speed = speed;
    }

    update()
    {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x , this.y , this.width , this.height);
    }
}

function spawnNote() {
    let randomFret = Math.floor(Math.random() * frets.length);
    let noteYSpeed = 3 * speedMultiplier;
    notes.push(new Note(frets[randomFret], noteYSpeed));
}

setInterval(spawnNote , 1000);

function increaseSpeed(){
    if(!gameOver) {
        speedMultiplier += 0.2;
        console.log("Speed Meningkat" , speedMultiplier.toFixed(1));
    }
}
setInterval(increaseSpeed, 10000);

const keys = {
    "a": 0,
    "s": 1,
    "d": 2,
    "f": 3
};

document.addEventListener("keydown" , (event) => {
    let index = keys[event.key];
    if(index !== undefined)
    {   
        fretPressed[index] = true;
        checkHit(index);
    }
})

document.addEventListener("keyup" , (event) => {
    let index = keys[event.key];
    if(index !== undefined)
    {
        fretPressed[index] = false;
    }
})

function checkHit(index) {
    let targetFret = frets[index];
    let tolerance = 10;
    for(let i = 0; i < notes.length; i++)
    {
        let note = notes[i];

        if(note.x - (targetFret - fretWidth / 2) <tolerance && note.y > canvas.height - 100)
        {
            notes.splice(i ,1);
            score += 10;
            return;
        }
    }
    score -= 5;
    if(score < -50){
        gameOver = true;
    }
}

function gameLoop() {
    if (gameOver) {
        drawScoreBoard();
        return;
    }
    ctx.clearRect(0 , 0 , canvas.width, canvas.height);
    drawFrets();
    drawScoreBoard();

    notes.forEach((note , index) => {
        note.update();
        note.draw();

        if(note.y > canvas.height){
            notes.splice(index , 1);
            score -= 10;
           if (score < -50) gameOver = true;
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();