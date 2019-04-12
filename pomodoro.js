const defaultSessionLength = 120;
const defaultBreakLength = 60;
let sessionLength;
let breakLength;
let isSession;
let isRunning;
let isPaused;
let time;
let timer;

function incrementSessionLength() {
    if(!isRunning && !isPaused) {
        sessionLength += 60;
        updateConfigDisplay();
        time = sessionLength;
        updateDisplay(time);
    }
}

function decrementSessionLength() {
    if(!isRunning && !isPaused) {
        if(sessionLength > 60) {
            sessionLength -= 60;  
            updateConfigDisplay();
            time = sessionLength;
            updateDisplay(time);
        }
    }
}

function incrementBreakLength() {
    if(!isRunning && !isPaused) {
        breakLength += 60;
        updateConfigDisplay();
    }
}

function decrementBreakLength() {
    if(!isRunning && !isPaused) {
        if(breakLength > 60) {
            breakLength -= 60;
            updateConfigDisplay();
        }
    }
}

function startTimer() {
    if (!isRunning) {
        if (time !== sessionLength && time !== breakLength) {
            // Use time as is
        } else if (isSession) {
            time = sessionLength;
        } else {
            time = breakLength;
        }
    }
    
    countdown(time);
    isRunning = true;
    isPaused = false;
}

function countdown(t) {
    timer = setInterval(function(){
        updateDisplay(t);
        t--;
        time = t;
        if (t === -1) {
            switchTimerMode();
        }
    }, 1000)
}

function switchTimerMode() {
    isSession = !isSession;
    isRunning = false;
    clearInterval(timer);
    time = isSession ? sessionLength : breakLength;
    startTimer();
}

function pauseTimer() {
    isRunning = false;
    isPaused = true;
    clearInterval(timer);
}

function stopTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timer)
    time = sessionLength;
    isSession = true;
    updateDisplay(time);
}

function resetTimer() {
    stopTimer();
    initializeClock();
}

function updateDisplay(currentTime) {
    // Transform from an int to a string
    // Transform from seconds to hours / minutes / seconds
    let seconds = currentTime % 60;
    let minutes = (currentTime - seconds) / 60 % 60;
    let hours = Math.trunc((currentTime - seconds) / 3600);
    
    seconds = seconds > 9 ? seconds : "0" + seconds;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    hours = hours > 9 ? hours : "0" + hours;
    
    let displayString = hours == 0 ? minutes + ":" + seconds : hours + ":" + minutes + ":" + seconds;
    
    document.getElementById("duration").innerHTML = displayString;
    document.getElementById("timerTitle").innerHTML = isSession ? "Session" : "Break";
    
    if (currentTime === 20) {
        document.getElementById("duration").classList.replace("duration-green", "duration-yellow");
    } else if (currentTime === 10) {
        document.getElementById("duration").classList.replace("duration-yellow", "duration-red");
    }
    
}

function initializeClock() {
    isSession = true;
    isRunning = false;
    isPaused = false;
    time = defaultSessionLength;
    sessionLength = defaultSessionLength;
    breakLength = defaultBreakLength;
    updateDisplay(time);
    updateConfigDisplay();
    
    document.getElementById("duration").className += "duration-green";
}

function updateConfigDisplay() {
    document.getElementById("sessionLength").innerHTML = sessionLength / 60;
    document.getElementById("breakLength").innerHTML = breakLength / 60;
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("sessionIncrement").addEventListener("click", incrementSessionLength);
document.getElementById("sessionDecrement").addEventListener("click", decrementSessionLength);
document.getElementById("breakIncrement").addEventListener("click", incrementBreakLength);
document.getElementById("breakDecrement").addEventListener("click", decrementBreakLength);

window.addEventListener("load", initializeClock);