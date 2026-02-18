document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. GLOBAL / SHARED UTILITIES
       ========================================= */
    
  
    const track = document.getElementById("galleryTrack");
    
    if (track) {

        const originalCards = Array.from(track.children);
 
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('cloned-card'); 
            track.appendChild(clone);
        });


        track.style.animation = "scroll-left 20s linear infinite";
    }


    /* =========================================
       2. FORM PAGE LOGIC (Contact, etc.)
       ========================================= */
    const form = document.querySelector("form");
    if (form) {
        const emailField = document.querySelector("input[name='email']");
        const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"];
        let submitTimes = []; 

        function containsSpam(message) {
            const lowerMessage = message.toLowerCase();
            return spamWords.some(word => lowerMessage.includes(word));
        }

        form.addEventListener("submit", function (e) {
            // Email Check
            if (emailField && !emailField.value.includes("@")) {
                alert("Enter a valid email");
                e.preventDefault();
                return;
            }

            // Spam Check
            const messageField = document.querySelector("#message");
            if (messageField && containsSpam(messageField.value)) {
                e.preventDefault();
                alert("Your message contains blocked spam keywords.");
                return;
            }

            // Rate Limit Check
            const now = Date.now();
            submitTimes = submitTimes.filter(time => now - time < 60000);
            if (submitTimes.length >= 3) {
                e.preventDefault();
                alert("Too many submissions. Please wait a minute.");
                return;
            }
            submitTimes.push(now);
        });
    }


    /* =========================================
       3. CLOCK LOGIC (Home Page)
       ========================================= */
    const clockElement = document.getElementById('clock-h');
    if (clockElement) {
        const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function pad(n) { return n < 10 ? '0' + n : n; }

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
            
            const greetEl = document.getElementById('greeting');
            if(greetEl) greetEl.textContent = greeting;

            const dateEl = document.getElementById('clock-date');
            if(dateEl) dateEl.textContent = DAYS[now.getDay()] + ', ' + MONTHS[now.getMonth()] + ' ' + now.getDate();
        }

        tick();
        setInterval(tick, 1000);
    }


    /* =========================================
       4. GAME PAGE LOGIC (Animate.html)
       ========================================= */
    const gameContainer = document.getElementById("game-container");
    
    if (gameContainer) {

        const ball = document.getElementById("ball");
        const outputDiv = document.getElementById("output");

        let x = 0;
        let y = 0;
        let dx = 3; 
        let dy = 3;

        function updatePositionDisplay(rect) {
            outputDiv.innerHTML = `
                <div class="coord-group"><strong>Left (x):</strong> <span>${rect.left.toFixed(0)} px</span></div>
                <div class="coord-group"><strong>Top (y):</strong> <span>${rect.top.toFixed(0)} px</span></div>
                <div class="coord-group"><strong>Right:</strong> <span>${rect.right.toFixed(0)} px</span></div>
                <div class="coord-group"><strong>Bottom:</strong> <span>${rect.bottom.toFixed(0)} px</span></div>
            `;
        }

        function changeColor() {
            const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#8e44ad'];
            ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        function animate() {
            const containerWidth = gameContainer.clientWidth;
            const containerHeight = gameContainer.clientHeight;
            const ballSize = ball.offsetWidth;
            if (x + ballSize >= containerWidth || x < 0) {
                dx = -dx;
                changeColor();
            }

            if (y + ballSize >= containerHeight || y < 0) {
                dy = -dy;
                changeColor();
            }

      
            x += dx;
            y += dy;
            ball.style.left = x + "px";
            ball.style.top = y + "px";

            updatePositionDisplay(ball.getBoundingClientRect());

            requestAnimationFrame(animate);
        }

        animate();
    }
});