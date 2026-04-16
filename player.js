const player = document.getElementById("player");

let x = 100;
let y = 0;
let velocityY = 0;
let velocityX = 0;
let gravity = 0.5;
let isJumping = false;

let keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function update() {

    if (keys["d"]) {
        x += 5;
        player.src = "Images/human1.png";
    }

    if (keys["a"]) {
        x -= 5;
        player.src = "Images/human2.png";
    }

    if (keys["w"] && !isJumping) {

        if (keys["d"]) {
            velocityY = 10;
            velocityX = 5;
        }
        else if (keys["a"]) {
            velocityY = 10;
            velocityX = -5;
        }
        else {
            velocityY = 10;
            velocityX = 0;
        }

        isJumping = true;
        player.src = "Images/human5.png";
    }

    y += velocityY;
    x += velocityX;

    velocityY -= gravity;
    velocityX *= 0.9;

    if (y <= 0) {
        y = 0;
        velocityY = 0;
        velocityX = 0;
        isJumping = false;
    }

    if (!keys["a"] && !keys["d"] && !keys["w"] && !isJumping) {
        player.src = "Images/human4.png";
    }

    player.style.left = x + "px";
    player.style.bottom = y + "px";

    requestAnimationFrame(update);
}

update();