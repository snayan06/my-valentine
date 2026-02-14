// DOM Elements
const openingScreen = document.getElementById('opening');
const questionScreen = document.getElementById('question');
const successScreen = document.getElementById('success');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mascot = document.getElementById('mascot');

// Sounds
const yaySound = document.getElementById('yay-sound');
const sadSound = document.getElementById('sad-music');

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
        mascot.classList.add('shake-animation'); // We need to add this CSS

        // Play sad music if first hover
        if (sadSound.paused) {
            sadSound.volume = 0.3;
            sadSound.play().catch(e => console.log("Audio requires interaction"));
        }

        document.body.classList.add('sad-mode');
    }
});

noBtn.addEventListener('mouseleave', () => {
    if (noClickCount < 4) {
        // Bear goes back to normal if you leave the "No" button alone
        mascot.src = "images/cute_character.png";
        mascot.classList.add('bounce-animation');
        mascot.classList.remove('shake-animation');
        document.body.classList.remove('sad-mode');

        // Stop sad music
        sadSound.pause();
        sadSound.currentTime = 0;
    }
});

yesBtn.addEventListener('mouseenter', () => {
    mascot.src = "images/cute_character_happy.png";
    document.body.classList.remove('sad-mode');
    sadSound.pause();
    sadSound.currentTime = 0;
});

yesBtn.addEventListener('mouseleave', () => {
    mascot.src = "images/cute_character.png";
});


noBtn.addEventListener('click', () => {
    noClickCount++;
    moveNoButton();
    // playBonk(); // Removed as requested

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

// Removed playBonk function

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
    playYay();
    mascot.src = "images/cute_character_happy.png"; // Stay happy

    questionScreen.classList.remove('active');
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    successScreen.classList.add('active');

    startSlideshow();
});

function playYay() {
    yaySound.volume = 0.5;
    yaySound.play();
}

// Slideshow Logic
function startSlideshow() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.photo-frame');

    // Show first one immediately
    if (slides.length > 0) {
        slides[0].classList.add('visible');
    }

    setInterval(() => {
        // Hide current
        slides[slideIndex].classList.remove('visible');

        // Move to next
        slideIndex = (slideIndex + 1) % slides.length;

        // Show next
        slides[slideIndex].classList.add('visible');
    }, 3000); // Change image every 3 seconds
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
