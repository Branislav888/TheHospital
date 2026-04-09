const logo = document.querySelector(".logo");

function animateLogo() {
    let time = Date.now() / 800;
    let move = Math.sin(time) * 8;

    logo.style.transform = `translateY(${move}px)`;

    requestAnimationFrame(animateLogo);
}

animateLogo();