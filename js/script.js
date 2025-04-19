document.addEventListener('DOMContentLoaded', () => {
    // Elementos do jogo
    const startScreen = document.querySelector('.start-screen');
    const playBtn = document.querySelector('.play-btn');
    const gameContainer = document.querySelector('.game-container');
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const clouds = document.querySelector('.clouds');
    const ground = document.querySelector('.ground');
    const scoreDisplay = document.querySelector('.score');
    const gameOverScreen = document.querySelector('.game-over');
    const restartBtn = document.querySelector('.restart-btn');
    const gameOverGif = document.querySelector('.game-over-gif');

    // Variáveis do jogo
    let isJumping = false;
    let isGameOver = false;
    let score = 0;
    let gameSpeed = 2;
    let gameLoop;

    // Inicia o jogo
    const startGame = () => {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        isGameOver = false;
        score = 0;
        pipeCounted = false;  
        scoreDisplay.textContent = '00';
        gameOverScreen.style.display = 'none';

        // Resetar posições
        mario.style.bottom = '0';
        mario.style.left = '50px';
        mario.style.backgroundImage = 'url("../img/mario.gif")';
        pipe.style.right = '-80px';
        pipe.style.animation = `pipe-animation ${gameSpeed}s infinite linear`;
        clouds.style.animation = 'clouds-animation 20s infinite linear';
        ground.style.animation = 'ground-animation 5s infinite linear';

        // Iniciar loop do jogo
        gameLoop = setInterval(updateGame, 20);
    };

    // Pulo do Mario
    const jump = () => {
        if (isJumping || isGameOver) return;

        isJumping = true;
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            // Subida
            if (jumpCount < 15) {
                mario.style.bottom = (jumpCount * 12) + 'px';
            } 
            // Descida
            else if (jumpCount < 30) {
                mario.style.bottom = ((30 - jumpCount) * 12) + 'px';
            } 
            // Fim do pulo
            else {
                clearInterval(jumpInterval);
                isJumping = false;
                mario.style.bottom = '0';
            }
            jumpCount++;
        }, 20);
    };

    // Verifica colisão
    const checkCollision = () => {
        const pipeRect = pipe.getBoundingClientRect();
        const marioRect = mario.getBoundingClientRect();
        
        // Ajuste fino na área de colisão
        const collisionMargin = 20; // Reduz a área de colisão
        
        return (
            pipeRect.left + collisionMargin < marioRect.right - collisionMargin &&
            pipeRect.right - collisionMargin > marioRect.left + collisionMargin &&
            pipeRect.top < marioRect.bottom - collisionMargin
        );
    };
    // Atualiza o jogo// Variável para controlar se o cano já foi contabilizado
let pipeCounted = false;

const updateGame = () => {
    if (isGameOver) return;

    const pipeRect = pipe.getBoundingClientRect();
    const marioRect = mario.getBoundingClientRect();

    // Verifica colisão
    if (checkCollision()) {
        gameOver();
        return;
    }

    // Lógica corrigida para contagem de pontos
    if (pipeRect.right < marioRect.left && !pipeCounted) {
        score++;
        scoreDisplay.textContent = score.toString().padStart(2, '0');
        pipeCounted = true;
        
        // Aumenta dificuldade a cada 5 pontos
        if (score % 5 === 0) {
            gameSpeed = Math.max(0.8, gameSpeed * 0.9);
            pipe.style.animationDuration = `${gameSpeed}s`;
        }
    } 
    // Reseta a flag quando um novo cano aparece
    else if (pipeRect.left > window.innerWidth) {
        pipeCounted = false;
    }
};
    // Game Over
    const gameOver = () => {
        isGameOver = true;
        clearInterval(gameLoop);
        
        // Para animações
        pipe.style.animation = 'none';
        clouds.style.animation = 'none';
        ground.style.animation = 'none';
        
        // Mostra imagem de game-over
        mario.style.backgroundImage = 'url("../img/game-over.png")';
        mario.style.width = '100px';
        mario.style.height = '100px';
        
        // Mostra tela de game over
        gameOverScreen.style.display = 'flex';
    };

    // Event Listeners
    playBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (gameContainer.style.display === 'block') {
                jump();
            } else {
                startGame();
            }
        }
    });

    document.addEventListener('touchstart', () => {
        if (gameContainer.style.display === 'block') {
            jump();
        } else {
            startGame();
        }
    });
});