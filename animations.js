document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth < 768;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX; this.y += this.directionY; this.draw();
        }
    }

    function init() {
        particles = [];
        const particleDensity = isMobile ? 20000 : 12000;
        let numberOfParticles = (canvas.height * canvas.width) / particleDensity;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .3) - .15;
            let directionY = (Math.random() * .3) - .15;
            let color = 'rgba(114, 255, 48, 0.6)';
            particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        if (isMobile) return;
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                             + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                if (distance < (canvas.width/8) * (canvas.height/8)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = `rgba(114, 255, 48, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connect();
    }

    init();
    animate();
    gsap.from(canvas, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });

    if (!isMobile) {
        const mainScreen = document.querySelector('.main-screen');
        const container = document.querySelector('.container');
        mainScreen.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = mainScreen;
            const xPos = (clientX / offsetWidth) - 0.5;
            const yPos = (clientY / offsetHeight) - 0.5;
            gsap.to(container, {
                duration: 0.8,
                x: -xPos * 25,
                y: -yPos * 25,
                rotationY: -xPos * 5,
                rotationX: yPos * 5,
                ease: 'power2.out'
            });
        });
    }

    try {
        const h1 = document.querySelector('header h1');
        if (h1) {
            const text = h1.textContent.trim();
            h1.innerHTML = text.split('').map(char => `<span class="char" style="display:inline-block;">${char}</span>`).join('');
        }
        const p = document.querySelector('header p');
        if (p) {
            const text = p.textContent.trim();
            p.innerHTML = text.split(' ').map(word => `<span class="word" style="display:inline-block;">${word}</span>`).join(' ');
        }

        const tl = gsap.timeline({delay: 0.5});
        tl.from('.char', { y: 40, opacity: 0, skewX: -20, ease: 'power4.out', stagger: 0.05 })
          .from('.word', { y: 20, opacity: 0, ease: 'power4.out', stagger: 0.04 }, "-=0.8")
          .from('.download-button', { scale: 0.8, opacity: 0, ease: 'back.out(1.7)' }, "-=0.8");
    } catch (error) {
        const tl = gsap.timeline();
        tl.from('header h1', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('header p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.7")
          .from('.download-button', { scale: 0.9, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, "-=0.6");
    }

    gsap.from('.features-title', {
        scrollTrigger: { trigger: '.features', start: 'top 85%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 1, ease: 'power4.out'
    });

    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        rotationX: -10,
        duration: 1,
        ease: 'power3.out',
        stagger: {
            amount: 0.4,
            from: 'start'
        }
    });

    const button = document.querySelector('.download-button');
    if (button) {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }
});