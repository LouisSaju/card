// Get elements
const card = document.getElementById('card');
const cardContainer = document.getElementById('cardContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

let isCardOpened = false;

// Open card on click
card.addEventListener('click', function() {
    if (!isCardOpened) {
        card.classList.add('opened');
        isCardOpened = true;
    }
});

// Yes button - show celebration
yesBtn.addEventListener('click', function() {
    celebration.classList.add('show');
    
    // Add confetti effect
    createConfetti();
});

// No button - runs away from cursor
noBtn.addEventListener('mouseover', function() {
    moveButton();
});

noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton();
});

// Also move the button when cursor gets near it
document.addEventListener('mousemove', function(e) {
    if (!isCardOpened) return;
    
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + 
        Math.pow(e.clientY - btnCenterY, 2)
    );
    
    // If cursor is within 100px of the button, move it
    if (distance < 100) {
        moveButton();
    }
});

function moveButton() {
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe boundaries (inside the card)
    const padding = 60; // Keep button away from edges
    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = 200; // Limit vertical movement
    const minY = 150;
    
    // Generate random position
    let newX = Math.random() * maxX;
    let newY = minY + Math.random() * (maxY - minY);
    
    // Make sure the button doesn't overlap with Yes button
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const buttonSpacing = 150;
    
    // If too close to Yes button, move it further away
    if (Math.abs(newX - 60) < buttonSpacing) {
        newX = newX < 150 ? maxX : 0;
    }
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

function createConfetti() {
    const colors = ['#ff6b9d', '#ffa3c1', '#ffd1dc', '#ff8fab', '#ffb3c9'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            const fallDuration = 3000 + Math.random() * 2000;
            const horizontalMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, fallDuration);
        }, i * 30);
    }
}

// Initial position for no button
window.addEventListener('load', function() {
    noBtn.style.position = 'absolute';
    noBtn.style.left = '200px';
    noBtn.style.top = '0';
});
