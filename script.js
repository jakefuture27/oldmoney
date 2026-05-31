document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const caText = document.getElementById('ca-text').innerText;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(caText);
            
            // Success feedback
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'COPIED!';
            copyBtn.style.backgroundColor = '#ff9d00'; // Neon yellow
            copyBtn.style.boxShadow = '0 0 20px #ff9d00';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = ''; 
                copyBtn.style.boxShadow = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            copyBtn.innerText = 'ERROR';
            setTimeout(() => {
                copyBtn.innerText = 'COPY';
            }, 2000);
        }
    });
});
