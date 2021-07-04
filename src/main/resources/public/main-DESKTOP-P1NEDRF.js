var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var workDuration = document.getElementById('workTime');
var breakDuration = document.getElementById('breakTime');

var min = document.getElementById('minutes');
var sec = document.getElementById('seconds');

var stats = document.getElementById('condition');
stats.innerText = "Work";

//set workDuration or breakDuration on clock
min.innerText = workDuration.value;

//set work Duration of clock on change
workDuration.addEventListener("change", changeWorkDuration);
function changeWorkDuration(){
    if(workDuration.value <  1){
        alert("Please input a duration of more than 1 minute")
        workDuration.value = 25;
    }else{
        min.innerText = workDuration.value;
    }
}

breakDuration.addEventListener("change", changeBreakDuration)
function changeBreakDuration(){
    if(breakDuration.value < 1){
        alert("Please input a duration of more than 1 minute")
        breakDuration.value = 5;
    }
}


//store a reference to a timer variable
var startTimer; 

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000);
        start.disabled = true;
        workDuration.disabled = true;
        breakDuration.disabled = true;
    } else{
        alert("time is already running!");
    }
})

reset.addEventListener('click', function(){
    workDuration.disabled = false;
    breakDuration.disabled = false;
    min.innerText = workDuration.value;
    sec.innerText = "00";

    stopInterval();
    startTimer = undefined;
})

stop.addEventListener('click', function(){
    workDuration.disabled = true
    breakDuration.disabled = true;
    stopInterval();
    startTimer = undefined;
})

var audio = new Audio("http://soundbible.com/grab.php?id=1531&type=mp3");

//start timer function
function timer(){

    //work timer countdown
    if(sec.innerText != 0){
        sec.innerText--;
    } else if(min.innerText != 0 && sec.innerText == 0){
        sec.innerText = 59;
        min.innerText--;
    }

    //break timer countdown 
    if(min.innerText == 0 && sec.innerText == 0 && stats.innerText == "Work"){
        audio.play();
        stopInterval();
        stats.innerText = "Break";
        min.innerText = breakDuration.value;
        sec.innerText = "00";
    }

    //increment counter by one if one full cycle is completed 
    if(min.innerText == 0 && sec.innerText == 0 && stats.innerText == "Break" ){
        audio.play();
        stopInterval();
        stats.innerText = "Work";
        min.innerText = workDuration.value;
        sec.innerText = "00";
    }

}

//stop timer function
function stopInterval(){
    start.disabled = false;
    clearInterval(startTimer);
    startTimer = undefined;
}