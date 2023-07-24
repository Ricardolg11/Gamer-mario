
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds')

const btn = document.querySelector("#refresh")



const jump = () => {
    mario.classList.add('jump');
    

    setTimeout(() => {

        mario.classList.remove('jump');
        
    }, 600);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ');
    const cludPosition = cloud.offsetLeft;
    
    if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;	

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;	

        mario.src = '../img/game-over.png';
        mario.style.width = '70px'
        mario.style.marginLeft = '50px'

        cloud.style.animation = 'none';
        cloud.style.left = `${cludPosition}px`;	

        
        clearInterval(loop);

        
    }

}, 10)



btn.addEventListener('click', () => {
    location.reload( );
})
document.addEventListener('keydown', jump);