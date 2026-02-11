function getGreeting() {
  const today = new Date();
  const hour = today.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning!";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon!";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening!";
  } else {
    greeting = "Good Night!";
  }

  return greeting;
}

function displayGreeting() {
  const greetingText = getGreeting();
  document.getElementById('greeting').innerHTML = greetingText;
}


function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}


function checkTime(i) {
  if (i < 10) {i = "0" + i}; // add zero in front of numbers < 10
  return i;
}


window.addEventListener('load', function() {
  displayGreeting();
  startTime();
});