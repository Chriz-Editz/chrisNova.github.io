const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');

toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-theme');

  // Toggle icons
  if (body.classList.contains('light-theme')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

const typedTextSpan = document.querySelector('.typed-text');
const words = ["interactive websites", "responsive web pages", "modern web solutions", "creative projects"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;

function type() {
  if(wordIndex >= words.length) wordIndex = 0;
  currentWord = words[wordIndex];

  if(isDeleting) {
    typedTextSpan.textContent = currentWord.substring(0, letterIndex--);
    if(letterIndex < 0) {
      isDeleting = false;
      wordIndex++;
      setTimeout(type, 200);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typedTextSpan.textContent = currentWord.substring(0, letterIndex++);
    if(letterIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else {
      setTimeout(type, 100);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

const circles = document.querySelectorAll('.circle-progress');

function animateCircles() {
  const triggerBottom = window.innerHeight * 0.85;

  circles.forEach(circle => {
    const circleTop = circle.getBoundingClientRect().top;
    if(circleTop < triggerBottom && !circle.classList.contains('animated')) {
      const progress = circle.dataset.progress;
      let current = 0;
      circle.classList.add('animated');

      const interval = setInterval(() => {
        current++;
        circle.style.background = `conic-gradient(var(--accent-color) ${current * 3.6}deg, #333 0deg)`;
        circle.querySelector('.progress-number').textContent = `${current}%`;
        if(current >= progress) clearInterval(interval);
      }, 20);
    }
  });
}

window.addEventListener('scroll', animateCircles);
window.addEventListener('load', animateCircles);

const slider = document.querySelector('.testimonial-slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let scrollAmount = 0;
const scrollStep = 320; // approximate width of a card + margin

nextBtn.addEventListener('click', () => {
  if(scrollAmount < slider.scrollWidth - slider.clientWidth) {
    scrollAmount += scrollStep;
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }
});

prevBtn.addEventListener('click', () => {
  if(scrollAmount > 0) {
    scrollAmount -= scrollStep;
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }
});

// Optional: Auto-scroll every 5 seconds
setInterval(() => {
  if(scrollAmount < slider.scrollWidth - slider.clientWidth) {
    scrollAmount += scrollStep;
  } else {
    scrollAmount = 0;
  }
  slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 5000);

// Initialize EmailJS (replace 'YOUR_USER_ID' with your actual ID)
emailjs.init("service_port_chrisNova01");

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Send email using EmailJS
  emailjs.sendForm('service_port_chrisNova01', 'template_ojqozsf', this)
    .then(() => {
      formMessage.textContent = 'Thank you! Your message has been sent.';
      formMessage.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
      contactForm.reset();
    }, (error) => {
      formMessage.textContent = 'Oops! Something went wrong. Please try again.';
      formMessage.style.color = 'red';
      console.error('EmailJS error:', error);
    });
});
