

// mengambi; canvas dengan id
// merubah canvas menjadi 2d

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// mengset width dan height canvas

canvas.width =  800;
canvas.height = 600;

// mengatur posisi frets  ,  mengatur width dan height frets , menyimpan notes



const frets = [150 , 300 , 450 , 600];
const fretWidth = 100;
const fretHeight = 20;
const notes = [];

// menampilkan frets dengan cara mengforeach frets agar fillRect dapat membuat rektengel

function drawFrets() {
    ctx.fillStyle = "gray";
    frets.forEach(x => {
        
        ctx.fillRect(x ,  canvas.height - 50 , fretWidth , fretHeight );
    })
}

// membuat note

class Note {

    // mengset x pos , y pos , width , height , dan speed

    constructor(x , speed) {
        this.x = x;
        this.y = 0;
        this.width = fretWidth;
        this.height = 20;
        this.speed = speed;
    }

    // mengubah y pos dengan speed

    update() {
        this.y += this.speed;
    }

    // membuat note 

    draw() {
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x , this.y , this.width , this.height);
    }
}

// random spawn note

function spawnNote() {

    // membuat random frest dengan math floor 

    let randomFrest = Math.floor(Math.random() * frets.length);
    let noteYSpeed = Math.random() > 0.8 ? 5 : 3;

    notes.push(new Note(frets[randomFrest] , noteYSpeed));
}

setInterval(spawnNote , 1000);

const keys = {
    "a": 0,
    "s": 1,
    "d": 2,
    "f": 3
};

//  mengambil eventListener sesuai apa yang di tekan keyboard

document.addEventListener("keydown" , (event) => {
    let index = keys[event.key];

    // mengcheck apakah keys dengan event sama atau tidak

    if(index !== undefined)
    {   
        // jika sama maka key yang di click akan di kirim ke checkHit 
        checkHit(index);
    }
});



function checkHit(index) {

    // mengambil keys dari pengecheckan di atas 

    let targetFret = frets[index];
    for (let i = 0; i < notes.length; i++)
    {
        let note = notes[i];

        // mengcheck jika note.x === target && posisi note.y lebih besar dari canvas.height di kurnagi 100 && note.y kurang dari canvas.height - 50;

        if(note.x === targetFret && note.y > canvas.height - 100)
        {   

            // maka hapus notes yang ada di array sesuai dengan i , 1
            notes.splice(i , 1);
            console.log("Hit !");
            break;
        }
    }
}



// menjalankan game

function gameLoop() {

    //membersihkan 
    // menampilkan frets

    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    drawFrets();

    // mengforeach note
    // menghilangkan note jika melebihin canvas.height

    notes.forEach((note , index) => {
        note.update();
        note.draw();
        

        // mengcheck note .y jika lebih besar dari height maka menghapus notenya 

        if(note.y > canvas.height) {
            notes.splice(index , 1);
            console.log("Miss!");
        }
    })

    // mengloop gameLoop

    requestAnimationFrame(gameLoop);
}

gameLoop();