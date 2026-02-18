const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function pad(n) {
  return n < 10 ? '0' + n : n;
}

const form = document.querySelector("form");
const emailField = document.querySelector("input[name='email']");
form.addEventListener("submit", function (e) {
if (!emailField.value.includes("@")) {
alert("Enter a valid email");
e.preventDefault();
return;
}
});

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

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("galleryTrack");
    
    // 1. Get all original cards
    const originalCards = Array.from(track.children);
    
    // 2. Clone each card and append it to the track
    // We do this to create a seamless loop. When the animation reaches 
    // the end of the first set, it snaps back to the beginning instantly.
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        // Optional: Add a class to clones if you need specific styling
        clone.classList.add('cloned-card');
        track.appendChild(clone);
    });

    // 3. Apply the Animation via JS to ensure it runs
    // We used CSS animation 'scroll-left' defined in the stylesheet.
    // The width of the track is now 200% of the content.
    // We animate from 0% to -50% (which is the exact length of the original set).
    
    // Adjust speed: 40s is the duration. Higher = Slower.
    track.style.animation = "scroll-left 20s linear infinite";
});

const spamWords = ["free money", "buy now", "click here",
"subscribe", "promo"];
function containsSpam(message) {
const lowerMessage = message.toLowerCase();
return spamWords.some(word => lowerMessage.includes(word));
}
form.addEventListener("submit", (e) => {
const message = document.querySelector("#message").value;
if (containsSpam(message)) {
e.preventDefault();
alert("Your message contains blocked spam keywords.");
}
});

let submitTimes = []; // stores timestamps of recent submissions
function isRateLimited() {
const now = Date.now();
// Keep only submissions from the last 60 seconds
submitTimes = submitTimes.filter(time => now - time < 60000);
// If already 3 submissions, block
if (submitTimes.length >= 3) {
return true;
}
// Otherwise, record this submission
submitTimes.push(now);
return false;
}
// Example usage inside submit event:
form.addEventListener("submit", (e) => {
if (isRateLimited()) {
e.preventDefault();
alert("Too many submissions. Please wait a minute.");
}
});

// Record when the form loads
const formLoadTime = Date.now();
function isTooFast() {
const submitTime = Date.now();
const secondsTaken = (submitTime - formLoadTime) / 1000;
return secondsTaken < 2;
}
form.addEventListener("submit", (e) => {
if (isTooFast()) {
e.preventDefault();
alert("Submission was too fast. Please try again.");
}
});