import canvas from "./canvas.js";
import Player from "./player.js";

const body = document.querySelector('body');
canvas.init();
body.prepend(canvas.getElem());
const playersCount = 1;
const players = [];

for (let i = 0; i < playersCount; i++) {
    const player = new Player();
    player.init();
    player.handlerKeyDown();
    player.handlerKeyUp();
    player.handlerMouseMove();
    players.push(player);
}

const drawAllPlayers = () => {
    players.forEach(player => {
        player.render(canvas.ctx);
    })
}

const animate = () => {
    canvas.clearRect();
    drawAllPlayers();
    window.requestAnimationFrame(animate);
}

animate();

