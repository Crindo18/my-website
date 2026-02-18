const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function tick() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  document.getElementById('clock-h').textContent = pad(h);
  document.getElementById('clock-m').textContent = pad(m);
  document.getElementById('clock-s').textContent = pad(s);

  let greeting = h >= 5 && h < 12 ? 'Good Morning'
               : h >= 12 && h < 17 ? 'Good Afternoon'
               : h >= 17 && h < 21 ? 'Good Evening'
               : 'Good Night';
  document.getElementById('greeting').textContent = greeting;

  document.getElementById('clock-date').textContent =
    DAYS[now.getDay()] + ', ' + MONTHS[now.getMonth()] + ' ' + now.getDate();
}

tick();
setInterval(tick, 1000);

const track = document.getElementById('track');
const pips = document.querySelectorAll('.progress-pip');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const CARD_WIDTH = 380 + 16; // card width + gap

// --- Drag to scroll ---
let isDragging = false, startX = 0, scrollStart = 0;

track.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  scrollStart = track.scrollLeft;
  track.classList.add('is-dragging');
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  track.scrollLeft = scrollStart - dx;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  track.classList.remove('is-dragging');
});

// --- Touch support ---
track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  scrollStart = track.scrollLeft;
}, { passive: true });

track.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - startX;
  track.scrollLeft = scrollStart - dx;
}, { passive: true });

// --- Arrow buttons ---
btnNext.addEventListener('click', () => {
  track.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
});

btnPrev.addEventListener('click', () => {
  track.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
});

// --- Progress pips ---
track.addEventListener('scroll', () => {
  const max = track.scrollWidth - track.clientWidth;
  const ratio = track.scrollLeft / max;
  const idx = Math.round(ratio * (pips.length - 1));
  pips.forEach((p, i) => p.classList.toggle('active', i === idx));
});

// --- Prevent accidental link clicks after drag ---
track.addEventListener('click', e => {
  if (Math.abs(track.scrollLeft - scrollStart) > 5) e.preventDefault();
});