document.addEventListener('DOMContentLoaded', () => {
    // Intro Screen Logic
    const introScreen = document.getElementById('intro-screen');
    const mainSite = document.getElementById('main-site');
    const enterBtn = document.getElementById('enter-btn');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            introScreen.classList.add('tv-off');
            setTimeout(() => {
                introScreen.style.display = 'none';
                mainSite.style.display = 'block';
            }, 500); // Wait for tv turn off animation (0.5s)
        });
    }

    // Generate floating money bags
    const container = document.getElementById('floating-balls-container');
    const numBalls = 30; // 30 money bags

    if (container) {
        for (let i = 0; i < numBalls; i++) {
            const ball = document.createElement('div');
            ball.innerText = '💰';
            ball.style.fontSize = Math.random() * 2 + 1 + 'rem';
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

    const copyBtn = document.getElementById('copy-btn');
    const caText = document.getElementById('ca-text');

    if (copyBtn && caText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(caText.innerText);
                
                // Success feedback
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'COPIED!';
                copyBtn.style.backgroundColor = '#4a86e8'; // Blue
                copyBtn.style.color = '#fff';
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.backgroundColor = '#fff'; 
                    copyBtn.style.color = '#000';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyBtn.innerText = 'ERROR';
                setTimeout(() => {
                    copyBtn.innerText = 'COPY';
                }, 2000);
            }
        });
    }

    // Live Market Cap Integration
    const mainLogo = document.getElementById('main-logo');
    const netWorthSpan = document.getElementById('net-worth');
    
    const CONTRACT_ADDRESS = 'DoQzMRpyfm5BgFGMqXkYNXwJqGpqWkBAp7A4XtBMpump';
    
    async function fetchMarketCap() {
        if (!netWorthSpan) return;
        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`);
            const data = await response.json();
            
            if (data && data.pairs && data.pairs.length > 0) {
                // Sort pairs by liquidity to get the most accurate market cap
                const sortedPairs = data.pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
                const pair = sortedPairs[0];
                const marketCap = pair.fdv || pair.marketCap || 0;
                
                if (marketCap > 0) {
                    netWorthSpan.innerText = Math.floor(marketCap).toLocaleString();
                } else {
                    netWorthSpan.innerText = '0 (NEW)';
                }
            } else {
                netWorthSpan.innerText = 'LOADING...';
            }
        } catch (error) {
            console.error('Error fetching market cap:', error);
        }
    }

    // Fetch immediately on load, then every 15 seconds
    fetchMarketCap();
    setInterval(fetchMarketCap, 15000);

    if (mainLogo) {
        mainLogo.addEventListener('click', (e) => {
            // Spawn Coins
            const numCoins = Math.floor(Math.random() * 5) + 5; // 5 to 10 coins per click
            for (let i = 0; i < numCoins; i++) {
                spawnPhysicsCoin(e.clientX, e.clientY);
            }
        });
    }

    function spawnPhysicsCoin(x, y) {
        const coin = document.createElement('div');
        const items = ['🎩', '🕰️', '📜', '🗞️'];
        coin.innerText = items[Math.floor(Math.random() * items.length)];
        coin.className = 'physics-coin';
        coin.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        coin.style.left = x + 'px';
        coin.style.top = y + 'px';
        document.body.appendChild(coin);

        let posX = x;
        let posY = y;
        let velocityX = (Math.random() - 0.5) * 20; // random horizontal spread
        let velocityY = (Math.random() * -15) - 10; // jump up
        let gravity = 0.8;
        let rotation = 0;
        let rotationSpeed = (Math.random() - 0.5) * 20;

        function update() {
            velocityY += gravity;
            posX += velocityX;
            posY += velocityY;
            rotation += rotationSpeed;

            coin.style.left = posX + 'px';
            coin.style.top = posY + 'px';
            coin.style.transform = `rotate(${rotation}deg)`;

            // Remove if it falls off screen
            if (posY > window.innerHeight + 100) {
                coin.remove();
            } else {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
});
