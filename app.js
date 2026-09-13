const pet = document.getElementById('pet');
const moodText = document.getElementById('moodText');
const joyBar = document.getElementById('joyBar');
const energyBar = document.getElementById('energyBar');
const feedBtn = document.getElementById('feedBtn');
const playBtn = document.getElementById('playBtn');

let x = 250;
let y = 180;
let dx = 2.4;
let dy = 1.8;
let joy = 68;
let energy = 78;
let mood = 'happy';

function movePet() {
  const bounds = pet.parentElement.getBoundingClientRect();
  const frameWidth = Math.max(260, bounds.width || 420);
  const frameHeight = Math.max(260, bounds.height || 420);

  x += dx;
  y += dy;

  if (x > frameWidth - 220 || x < 0) {
    dx *= -1;
    x = Math.max(0, Math.min(frameWidth - 220, x));
    pet.classList.add('playing');
  }

  if (y > frameHeight - 230 || y < 0) {
    dy *= -1;
    y = Math.max(0, Math.min(frameHeight - 230, y));
  }

  pet.style.left = `${x}px`;
  pet.style.top = `${y}px`;
}

function updateMood(nextMood) {
  mood = nextMood;
  moodText.textContent = mood;
}

function updateBars() {
  joyBar.style.width = `${Math.max(12, Math.min(100, joy))}%`;
  energyBar.style.width = `${Math.max(12, Math.min(100, energy))}%`;
}

pet.addEventListener('click', () => {
  pet.classList.remove('happy');
  void pet.offsetWidth;
  pet.classList.add('happy');
  joy = Math.min(100, joy + 10);
  energy = Math.max(20, energy - 3);
  updateMood('happy');
  updateBars();
});

feedBtn.addEventListener('click', () => {
  joy = Math.min(100, joy + 14);
  energy = Math.min(100, energy + 5);
  updateMood('full');
  updateBars();
});

playBtn.addEventListener('click', () => {
  joy = Math.min(100, joy + 12);
  energy = Math.max(15, energy - 8);
  pet.classList.add('playing');
  updateMood('play');
  updateBars();

  setTimeout(() => pet.classList.remove('playing'), 300);
});

setInterval(() => {
  joy = Math.min(100, Math.max(20, joy + (Math.random() > 0.5 ? 1 : -1)));
  energy = Math.min(100, Math.max(15, energy + (Math.random() > 0.5 ? -1 : 1)));
  updateBars();
}, 900);

setInterval(() => {
  if (mood === 'happy') {
    movePet();
  } else {
    movePet();
  }
}, 35);

updateBars();
