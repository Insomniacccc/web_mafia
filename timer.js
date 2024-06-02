let timer;
let remainingTime = 60; // 60 seconds
const timerDisplay = document.getElementsByClassName('table__timer-display')[0];
const startButton = document.getElementsByClassName('table__timer-start-button')[0];
const stopButton = document.getElementsByClassName('table__timer-stop-button')[0];
const resetButton = document.getElementsByClassName('table__timer-reset-button')[0];

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateDisplay();
            } else {
                stopTimer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    remainingTime = 60;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
