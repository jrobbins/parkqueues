"use strict";

/* Round the standby time down to the nearest tier, used for choosing color. */
function standbyTier(estMinutes) {
    if (estMinutes <= 10) return 10;
    if (estMinutes <= 20) return 20;
    if (estMinutes <= 30) return 30;
    if (estMinutes <= 45) return 45;
    if (estMinutes <= 60) return 60;
    if (estMinutes <= 90) return 90;
    return 120;
}


/* Convert an int like 830 to number of minutes since midnight. */
function hhmmToSimMinute(hhmm) {
    return (Math.floor(hhmm / 100) * 60) + hhmm % 100;
}


/* Convert an int like 830 into a string "8:30am". */
function hhmmToTimeStr(hhmm) {
    return simMinuteToTimeStr(hhmmToSimMinute(hhmm));
}


/* Convert an int for minutes since midnight like 75 to "1:15am". */
function simMinuteToTimeStr(simMinute) {
    var hour = Math.floor(simMinute / 60);
    var minute = simMinute % 60;
    var ampm = 'am';
    if (hour >= 12) ampm = 'pm';
    if (hour > 12) hour = hour - 12;
    if (hour == 0) hour = 12;
    return hour + ':' + ('0' + minute).slice(-2) + ampm;
}


