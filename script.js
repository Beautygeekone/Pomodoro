let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let workTime = 25;
let breakTime = 5;
let seconds = 0;

let interval = null;
let isWorkTime = true;

window.onload = () => {
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = "00";
  workTitle.classList.add('active');
};

function startTimer() {
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "inline-block";

  let minutes = isWorkTime ? workTime : breakTime;
  seconds = 0;

  interval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        isWorkTime = !isWorkTime;
        switchMode();
        clearInterval(interval);
        startTimer(); // empieza la siguiente fase automáticamente
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    updateDisplay(minutes, seconds);
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  isWorkTime = true;
  updateDisplay(workTime, 0);
  workTitle.classList.add("active");
  breakTitle.classList.remove("active");

  document.getElementById("start").style.display = "inline-block";
  document.getElementById("reset").style.display = "none";
}

function switchMode() {
  if (isWorkTime) {
    workTitle.classList.add("active");
    breakTitle.classList.remove("active");
  } else {
    workTitle.classList.remove("active");
    breakTitle.classList.add("active");
  }
}

function updateDisplay(min, sec) {
  document.getElementById("minutes").innerHTML = min < 10 ? "0" + min : min;
  document.getElementById("seconds").innerHTML = sec < 10 ? "0" + sec : sec;
}
