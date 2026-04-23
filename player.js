const player = document.getElementById("player");
const chairs = [
    document.getElementById("chair"),
    document.getElementById("chair1"),
    document.getElementById("chair2")
];

// ===== ANIMATION =====
const framesRight = [
    "Images/human1.png",
    "Images/human5.png",
    "Images/human3.png"
];

const framesLeft = [
    "Images/human2.png",
    "Images/human6.png",
    "Images/human7.png"
];

let frameIndexRight = 0;
let frameIndexLeft = 0;
let animCooldown = 0;

// ===== PLAYER =====
let x = 100;
let y = 0;
let vy = 0;

const gravity = 0.5;
const jumpPower = 15;

let onGround = false;
let keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// ===== SIZE =====
const PW = 60;
const PH = 100;

function anim(src) {
    player.src = src;
}

function update() {

    // ===== INPUT =====
    if (keys["a"]) x -= 5;
    if (keys["d"]) x += 5;

    if (keys["w"] && onGround) {
        vy = jumpPower;
        onGround = false;
    }

    // ===== PHYSICS =====
    vy -= gravity;
    y += vy;

    // ===== GROUND =====
    if (y < 0) {
        y = 0;
        vy = 0;
        onGround = true;
    }

    const pLeft = x;
    const pRight = x + PW;
    const pBottom = y;
    const pTop = y + PH;

    let groundedThisFrame = false;

    // ===== CHAIR COLLISION =====
    chairs.forEach(chair => {

        if (!chair) return;

        const gameRect = player.parentElement.getBoundingClientRect();
        const chairRect = chair.getBoundingClientRect();

        const cLeft = chairRect.left - gameRect.left;
        const cRight = chairRect.right - gameRect.left;
        const cBottom = gameRect.bottom - chairRect.bottom;
        const cTop = cBottom + chairRect.height;

        const overlapX = pRight > cLeft && pLeft < cRight;
        const overlapY = pTop > cBottom && pBottom < cTop;

        const falling = vy <= 0;

        const landing =
            falling &&
            overlapX &&
            pBottom <= cTop &&
            pBottom - vy >= cTop;

        if (landing) {
            y = cTop;
            vy = 0;
            groundedThisFrame = true;
        }

        if (overlapX && overlapY) {
            if (pRight > cLeft && pLeft < cLeft) {
                x = cLeft - PW;
            }
            else if (pLeft < cRight && pRight > cRight) {
                x = cRight;
            }
        }
    });

    if (groundedThisFrame) {
        onGround = true;
    }

    // ===== ANIMATION =====
    if (keys["a"] && keys["w"]) {
        anim("Images/human6.png");
    }
    else if (keys["d"] && keys["w"]) {
        anim("Images/human1.png");
    }
    else if (keys["w"]) {
        anim("Images/human4.png");
    }
    else if (keys["a"]) {
        if (animCooldown <= 0) {
            anim(framesLeft[frameIndexLeft]);
            frameIndexLeft = (frameIndexLeft + 1) % framesLeft.length;
            animCooldown = 6;
        } else animCooldown--;
    }
    else if (keys["d"]) {
        if (animCooldown <= 0) {
            anim(framesRight[frameIndexRight]);
            frameIndexRight = (frameIndexRight + 1) % framesRight.length;
            animCooldown = 6;
        } else animCooldown--;
    }
    else {
        anim("Images/human4.png");
    }

    // ===== APPLY =====
    player.style.left = x + "px";
    player.style.bottom = y + "px";

    requestAnimationFrame(update);
}

update();