document.addEventListener('DOMContentLoaded', () => {
    // Generate floating fists
    const container = document.getElementById('floating-balls-container');
    const numBalls = 60; // Generate 60 fists everywhere

    if (container) {
        for (let i = 0; i < numBalls; i++) {
            const ball = document.createElement('img');
            ball.src = './homo.png';
            ball.classList.add('ball');
            
            // Randomize properties
            const size = Math.random() * 80 + 30; // 30px to 110px
            const posX = Math.random() * 100; // 0% to 100%
            const posY = Math.random() * 100; // 0% to 100%
            const delay = Math.random() * -30; // Negative delay so they start immediately
            const duration = Math.random() * 20 + 15; // 15s to 35s
            const opacity = Math.random() * 0.4 + 0.2; // 0.2 to 0.6
            const blur = Math.random() * 3; // 0px to 3px

            ball.style.width = `${size}px`;
            ball.style.left = `${posX}vw`;
            ball.style.top = `${posY}vh`;
            ball.style.animationDuration = `${duration}s`;
            ball.style.animationDelay = `${delay}s`;
            ball.style.opacity = opacity;
            ball.style.filter = `blur(${blur}px)`;

            // Error handling in case image doesn't load
            ball.onerror = function() {
                this.style.display = 'none';
            };

            container.appendChild(ball);
        }
    }
});
