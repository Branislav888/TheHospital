const player = document.getElementById("player");

let x = 100;
let y = 0;

let vy = 0;
const gravity = 0.5;
const jumpPower = 15;

let onGround = false;

let keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

const PW = 60;
const PH = 100;

const GROUND_H = 60;

const CX = 400;
const CW = 40;
const CH = 20;

const CY = GROUND_H;

function anim(src) {
    if (!player.src.includes(src)) {
        player.src = src;
    }
}

function update() {

    let moving = false;

    if (keys["a"]) {
        x -= 5;
        anim("Images/human2.png");
        moving = true;
    }

    if (keys["d"]) {
        x += 5;
        anim("Images/human1.png");
        moving = true;
    }

    if (keys["w"] && onGround) {
        vy = jumpPower;
        onGround = false;
        anim("Images/human5.png");
    }

    vy -= gravity;
    y += vy;

    if (y <= 0) {
        y = 0;
        vy = 0;
        onGround = true;
    }

    const overlapX = x < CX + CW && x + PW > CX;

    const landingOnChair =
        vy <= 0 &&
        y <= CY + CH &&
        y + vy >= CY + CH;

    if (overlapX && landingOnChair) {
        y = CY + CH;
        vy = 0;
        onGround = true;
    }

    const verticalOverlap =
        y < CY + CH &&
        y + PH > CY;

    if (overlapX && verticalOverlap) {
        if (x < CX) {
            x = CX - PW;
        } else {
            x = CX + CW;
        }
    }

    if (!moving && onGround) {
        anim("Images/human4.png");
    }

    player.style.left = x + "px";
    player.style.bottom = y + "px";

    requestAnimationFrame(update);
}

update();