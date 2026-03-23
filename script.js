// Starry Background
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 400;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5;
        this.opacity = Math.random();
        this.blinkSpeed = Math.random() * 0.02;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }

        this.opacity += this.blinkSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.blinkSpeed = -this.blinkSpeed;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Shooting Star
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 5;
        this.active = false;
        this.waitTime = Math.random() * 3000;
    }

    update() {
        if (!this.active) {
            if (this.waitTime > 0) {
                this.waitTime--;
            } else {
                this.active = true;
            }
            return;
        }

        this.x -= this.speed;
        this.y += this.speed;

        if (this.x < -this.len || this.y > canvas.height + this.len) {
            this.reset();
        }
    }

    draw() {
        if (!this.active) return;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - this.len);
        ctx.stroke();
    }
}

let shootingStars = [new ShootingStar(), new ShootingStar()];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    shootingStars.forEach(s => {
        s.update();
        s.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Mouse Glow Effect
const mouseGlow = document.getElementById('mouse-glow');
window.addEventListener('mousemove', (e) => {
    mouseGlow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const words = ["Full Stack Developer", "Backend Specialist", "Frontend Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Wait at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// Toggle Buttons
const resumeBtn = document.getElementById('resume-btn');
const resumeContent = document.getElementById('resume-content');
const hireBtn = document.getElementById('hire-btn');
const hireContent = document.getElementById('hire-content');

resumeBtn.addEventListener('click', () => {
    resumeContent.classList.toggle('hidden');
    resumeContent.classList.toggle('visible');
    hireContent.classList.add('hidden');
    hireContent.classList.remove('visible');
});

hireBtn.addEventListener('click', () => {
    hireContent.classList.toggle('hidden');
    hireContent.classList.toggle('visible');
    resumeContent.classList.add('hidden');
    resumeContent.classList.remove('visible');
});

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // For now, just log and alert. In production, use EmailJS.
    console.log('Sending message to harshkamboj182@gmail.com...');
    console.log('From:', name, `(${email})`);
    console.log('Message:', message);
    
    alert('Thank you for your message, ' + name + '! I will get back to you soon.');
    contactForm.reset();
});
