const defaultSessionLength = 10;
const defaultBreakLength = 300;
let sessionLength = defaultSessionLength;
let breakLength = defaultBreakLength;
let isSession = true;
let isRunning = false;
let time;

function incrementSessionLength() {
    if(!isRunning) {
        sessionLength += 60;
    }
}

function decrementSessionLength() {
    if(!isRunning) {
        if(sessionLength > 60) {
            sessionLength -= 60;   
        }
    }
}

function incrementBreakLength() {
    if(!isRunning) {
        breakLength += 60;
    }
}

function decrementBreakLength() {
    if(!isRunning) {
        if(breakLength > 60) {
            breakLength -= 60;
        }
    }
}

function startTimer() {
    console.log("start");
    isRunning = true;
    if(isSession) {
        time = sessionLength;
    } else {
        time = breakLength;
    }
    console.log('starttime', time);

    timer = setInterval(function(){ 
      time -= 1;
      console.log(time)
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000)

    console.log("finished")
}

function countdown() {
    console.log('countdown')
//     if(time === 0) {
//         isRunning = false;
//     }
    
//     if(isRunning) {
//         time -= 1;
//         setInterval(countdown(), 1000)
//     }
}

document.getElementById("start").addEventListener("click", startTimer)