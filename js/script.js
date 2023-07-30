
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds')
let score = document.querySelector(".score");
let gameOver = document.querySelector(".gameOver");
const btn = document.querySelector("#refresh")

//declaring variable for score
let interval = null;
let playerScore = 0;

//function for score
let scoreCounter = () => {
    if( gameOver.style.display == 'block' ){
        return playerScore;
    }
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
}

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(() => {

        mario.classList.remove('jump');
        
    }, 600);
}

interval = setInterval(scoreCounter, 150);

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ');
    const cludPosition = cloud.offsetLeft;
    gameOver.style.display = "none";

    if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;	

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;	

        mario.src = './img/game-over.png';
        mario.style.width = '70px'
        mario.style.marginLeft = '50px'

        cloud.style.animation = 'none';
        cloud.style.left = `${cludPosition}px`;	

        gameOver.style.display = "block";
        
        
        clearInterval(loop);

    }
    
}, 10)

document.addEventListener('keydown' , jump);
document.addEventListener('click' , jump);

btn.addEventListener('click', () => {
    location.reload();
})
