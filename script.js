// DOM Elements
const openingScreen = document.getElementById('opening');
const questionScreen = document.getElementById('question');
const afterglowScreen = document.getElementById('afterglow');
const successScreen = document.getElementById('success');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mascot = document.getElementById('mascot');
const buttonsWrap = document.querySelector('.buttons');

// Sounds
const yaySound = document.getElementById('yay-sound');
// const sadSound = document.getElementById('sad-music'); // Removed usage

// Audio gating for browser autoplay policies
let audioEnabled = false;
function enableAudio() {
    audioEnabled = true;
}
document.addEventListener('click', enableAudio, { once: true });
document.addEventListener('touchstart', enableAudio, { once: true });

// Polaroid Shuffle
let zIndexCounter = 1;
const polaroids = document.querySelectorAll('.photo-frame');
polaroids.forEach((frame) => {
    frame.style.zIndex = zIndexCounter++;
    frame.addEventListener('click', () => {
        zIndexCounter++;
        frame.style.zIndex = zIndexCounter;
        const tilt = (Math.random() * 12 - 6).toFixed(1);
        frame.style.setProperty('--r', `${tilt}deg`);
        frame.classList.add('active');
        setTimeout(() => frame.classList.remove('active'), 220);
    });
});

// Initial Sequence
setTimeout(() => {
    openingScreen.classList.remove('active');
    openingScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    questionScreen.classList.add('active');
}, 3500);

// No Button Logic
let noClickCount = 0;

// Emotional Bear Logic
noBtn.addEventListener('mouseenter', () => {
    // Bear gets sad / shocked
    if (noClickCount < 4) {
        mascot.src = "images/cute_character_sad.png";
        mascot.classList.remove('bounce-animation');
        mascot.classList.add('shake-animation');
        document.body.classList.add('sad-mode');
    }
});

noBtn.addEventListener('mouseleave', () => {
    if (noClickCount < 4) {
        // Bear goes back to normal
        mascot.src = "images/cute_character.png";
        mascot.classList.add('bounce-animation');
        mascot.classList.remove('shake-animation');
        document.body.classList.remove('sad-mode');
    }
});

yesBtn.addEventListener('mouseenter', () => {
    mascot.src = "images/cute_character_happy.png";
    document.body.classList.remove('sad-mode');
});

yesBtn.addEventListener('mouseleave', () => {
    mascot.src = "images/cute_character.png";
});


noBtn.addEventListener('click', () => {
    enableAudio();
    noClickCount++;
    moveNoButton();

    // Scale YES button
    const currentScale = 1 + (noClickCount * 0.2);
    yesBtn.style.transform = `scale(${currentScale})`;

    // Change Text
    if (noClickCount === 1) {
        noBtn.innerText = "Are you sure? 🥺";
    } else if (noClickCount === 2) {
        noBtn.innerText = "Don't break my heart! 💔";
        noBtn.style.transform = "scale(0.8)";
    } else if (noClickCount === 3) {
        noBtn.innerText = "I'm telling your mom! 😭";
        noBtn.style.transform = "scale(0.6)";
    } else if (noClickCount >= 4) {
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
    }
});


function moveNoButton() {
    const containerRect = buttonsWrap.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries within the container
    const buffer = 8; // Padding from edge
    const maxX = containerRect.width - btnRect.width - buffer;
    const maxY = containerRect.height - btnRect.height - buffer;

    const randomX = Math.max(buffer, Math.random() * maxX);
    const randomY = Math.max(buffer, Math.random() * maxY);

    // Apply position relative to .buttons
    if (noClickCount === 1) {
        noBtn.style.position = 'absolute';
    }

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Yes Button Logic
yesBtn.addEventListener('click', () => {
    enableAudio();
    triggerConfetti();
    playYay();
    mascot.src = "images/cute_character_happy.png"; // Stay happy

    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    afterglowScreen.classList.remove('hidden');
    afterglowScreen.classList.add('active');

    setTimeout(() => {
        afterglowScreen.classList.remove('active');
        afterglowScreen.classList.add('hidden');
        successScreen.classList.remove('hidden');
        successScreen.classList.add('active');
    }, 2200);
});

function playYay() {
    if (!audioEnabled) {
        return;
    }
    yaySound.volume = 0.5;
    yaySound.play();
}

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
