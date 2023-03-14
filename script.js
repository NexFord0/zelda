const sprite_height = 32;
const sprite_width = 24;
const nbW = 12;
const time = 1/24;
let max_height = window.innerHeight/2;
let max_width = window.innerWidth/2;
let speed = 10;
let isColor = false;
let color = "#000000";

let img;
let sprite;
let audio;
let mode_frame = 3;
let positionX = 0;
let positionY = 0;

async function init() {
    // await delay(1);
    get_value();
    change_style();
    change_color();
    mobile();
    await move();
}

const get_value = () => {
    img = document.querySelector("#sprite");
    sprite = document.querySelector("main");
    audio = document.querySelector("audio");
}

const change_style = () => {
    sprite.style.width = `${sprite_width}px`;
    sprite.style.height = `${sprite_height}px`;
    sprite.style.left = `calc(50vw - ${sprite_width/2}px)`;
    sprite.style.top = `calc(50vh - ${sprite_height/2}px)`;
}

const change_color = () => {
    setInterval(() => {
        color = "#000000"
        if (isColor) {
            color = randomColor();
        }
        document.body.style.backgroundColor = color;
    }, 100)
}

const randomColor = () => {
    return `#${formatHexa()}${formatHexa()}${formatHexa()}`;
}

const formatHexa = () => {
    const hexa = Math.trunc(Math.random()*256).toString(16)
    if (hexa.length === 1) {
        return `0${hexa}`
    }
    return hexa
}

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

async function move() {
    for (let id_frame = 0; id_frame < nbW; id_frame++) {
        img.style.translate = `-${id_frame*sprite_width-0.3+(mode_frame===4?0.7:0)}px -${(mode_frame-1)*sprite_height+0.5}px`;
        deplacement();
        change_direction();
        await delay(time);
    }
    await move();
}

let isLeft = false;
let isRight = false;
let isUp = false;
let isDown = false;

onkeyup = (e) => {
    if (e.key === "ArrowRight") {
        isRight = false;
    }
    if (e.key === "ArrowLeft") {
        isLeft = false;
    }
    if (e.key === "ArrowUp") {
        isUp = false;
    }
    if (e.key === "ArrowDown") {
        isDown = false;
    }
    if (e.key === " ") {
        sprite.style.animation = "";
        isColor = false
        speed=10;
        audio.pause();
        audio.currentTime = 0;
    }
    change_direction();
}
onkeydown = (e) => {
    if (e.key === "ArrowRight") {
        isRight = true;
    }
    if (e.key === "ArrowLeft") {
        isLeft = true;
    }
    if (e.key === "ArrowUp") {
        isUp = true;
    }
    if (e.key === "ArrowDown") {
        isDown = true;
    }
    if (e.key === " ") {
        sprite.style.animation = "1s scale infinite";
        isColor = true;
        speed=10*3;
        audio.play();
    }
    if (e.key === "€") {
        audio.src = "etoile_mario.mp3";
    }
    if (e.key === "Delete") {
        audio.src = "bonne_apremidi_boost.mp3";
    }
    if (e.key === "*") {
        audio.src = "je_suis_genieur.mp3"
    }
    change_direction();
}

const change_direction = () => {
    if (isUp && isDown) {
        isUp = false;
        isDown = false;
        mode_frame = 3;
        return;
    }
    if (isLeft && isRight) {
        isLeft = false;
        isRight = false;
        mode_frame = 3;
        return;
    }
    if (isLeft) {
        mode_frame = 4;
    }
    if (isRight) {
        mode_frame = 2;
    }
    if (isUp) {
        mode_frame = 1;
    }
    if (isDown) {
        mode_frame = 3;
    }
}

const deplacement = () => {
    let radioX = `${(isLeft?-1:0) + (isRight?1:0)}`;
    positionX += radioX*speed;
    let radioY = `${(isUp?-1:0) + (isDown?1:0)}`;
    positionY += radioY*speed;
    if (positionX < (-1*max_width-2*speed) || positionX > (max_width+2*speed)) {
        positionX *= -1;
    }
    if (positionY < (-1*max_height-2*speed) || positionY > (max_height+2*speed)) {
        positionY *= -1;
    }
    sprite.style.translate = `${positionX}px ${positionY}px`;
}

const resetIs = () => {
    isDown = false;
    isUp = false;
    isLeft = false;
    isRight = false;
}

const mobile = () => {
    const credit = document.getElementById("credit")
    sprite.addEventListener("click", () => {
        audio.src = "gas_gas_gas_cut.mp3";
        isColor =! isColor;
    })
    credit.addEventListener("click", () => {
        audio.src = "gas_gas_gas_cut.mp3";
        isColor =! isColor;
    })
    const leftTop = document.getElementById("leftTop")
    leftTop.addEventListener("mousedown", () => {
        resetIs();
        isUp = false;
        isLeft = false;
    })
    leftTop.addEventListener("mouseup", () => {
        isUp = true;
        isLeft = true;
    })
    const top = document.getElementById("top")
    top.addEventListener("mousedown", () => {
        resetIs();
        isUp = false;
    })
    top.addEventListener("mouseup", () => {
        isUp = true;
    })
    const rightTop = document.getElementById("rightTop")
    rightTop.addEventListener("mousedown", () => {
        resetIs();
        isUp = false;
        isRight = false;
    })
    rightTop.addEventListener("mouseup", () => {
        isUp = true;
        isRight = true;
    })
    const left = document.getElementById("left")
    left.addEventListener("mousedown", () => {
        resetIs();
        isLeft = false;
    })
    left.addEventListener("mouseup", () => {
        isLeft = true;
    })
    const center = document.getElementById("center")
    center.addEventListener("mousedown", () => {
        isLeft = false;
        isRight = false;
        isUp = false;
        isDown = false;
    })
    center.addEventListener("mouseup", () => {
        isLeft = true;
        isRight = true;
        isUp = true;
        isDown = true;
    })
    const right = document.getElementById("right")
    right.addEventListener("mousedown", () => {
        resetIs();
        isRight = false;
    })
    right.addEventListener("mouseup", () => {
        isRight = true;
    })
    const leftBottom = document.getElementById("leftBottom")
    leftBottom.addEventListener("mousedown", () => {
        resetIs();
        isDown = false;
        isLeft = false;
    })
    leftBottom.addEventListener("mouseup", () => {
        isDown = true;
        isLeft = true;
    })
    const bottom = document.getElementById("bottom")
    bottom.addEventListener("mousedown", () => {
        resetIs();
        isDown = false;
    })
    bottom.addEventListener("mouseup", () => {
        isDown = true;
    })
    const rightBottom = document.getElementById("rightBottom")
    rightBottom.addEventListener("mousedown", () => {
        resetIs();
        isDown = false;
        isRight = false;
    })
    rightBottom.addEventListener("mouseup", () => {
        isDown = true;
        isRight = true;
    })
}

init();