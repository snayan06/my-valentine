// DOM Elements
const openingScreen = document.getElementById('opening');
const questionScreen = document.getElementById('question');
const successScreen = document.getElementById('success');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Initial Sequence
setTimeout(() => {
    openingScreen.classList.remove('active');
    openingScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    questionScreen.classList.add('active');
}, 3500); // 3.5s delay for reading first message

// No Button Logic
let noClickCount = 0;

noBtn.addEventListener('click', () => {
    noClickCount++;
    moveNoButton();

    // Scale YES button
    const currentScale = 1 + (noClickCount * 0.2);
    yesBtn.style.transform = `scale(${currentScale})`;

    // Change Text
    if (noClickCount === 1) {
        noBtn.innerText = "Are you sure? 🥺";
    } else if (noClickCount === 2) {
        noBtn.innerText = "Hmm... think again 😌";
        noBtn.style.transform = "scale(0.8)";
    } else if (noClickCount === 3) {
        noBtn.innerText = "Suspicious... 👀";
        noBtn.style.transform = "scale(0.6)";
    } else if (noClickCount >= 4) {
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
    }
});

function moveNoButton() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries within the container
    const buffer = 20; // Padding from edge
    const maxX = containerRect.width - btnRect.width - buffer;
    const maxY = containerRect.height - btnRect.height - buffer;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply position (Note: this moves relative to nearest positioned ancestor, which is .buttons normally, but we might want absolute)
    // To make it jump around effectively, we need to set its position to absolute relative to the container.
    // However, initially it's in flex flow.
    // Let's force absolute positioning on the first click.

    if (noClickCount === 1) {
        noBtn.style.position = 'absolute';
    }

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Yes Button Logic
yesBtn.addEventListener('click', () => {
    triggerConfetti();
    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    successScreen.classList.add('active');
});

// Confetti Effect
function triggerConfetti() {
    // Fire confetti from left and right
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
