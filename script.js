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
        startTimer(); 
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

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundMusic');
    const unmuteButton = document.getElementById('unmuteButton');

    // Function to try and play audio
    function tryPlayAudio() {
        // Attempt to play the audio
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                console.log('Audio autoplayed successfully.');
                unmuteButton.style.display = 'none'; // Hide the button if successful
            }).catch(error => {
                // Autoplay was prevented (e.g., by browser policy)
                console.log('Autoplay prevented:', error);
                unmuteButton.style.display = 'block'; // Show the unmute button
            });
        }
    }

    
    tryPlayAudio();

    unmuteButton.addEventListener('click', () => {
        audio.play().then(() => {
            unmuteButton.style.display = 'none';
            console.log('Audio played by user interaction.');
        }).catch(error => {
            console.error('Error playing audio after user interaction:', error);
        });
    });
    document.body.addEventListener('click', () => {
        if (audio.paused) { 
            tryPlayAudio(); 
        }
    }, { once: true }); 
});