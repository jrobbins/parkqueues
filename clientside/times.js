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


/* Wait time estimation works like this:
   1. We need the crowd level from the calendar.  This itself is estimated based
      on rules about seasons, holidays, days of the week, weather, and local events.
   2. We estimate the total crowd size based on crowd level for any minute of the day.
      This is based on entry gate rate, meal times, sunset, and closing time.
   3. Each ride has a "Ticket" that shows how popular it is.
   4. We look up the daily demand curve based on the ticket.

/* Estimate the wait time for a ride... magic... */
function waitTime(minute) {
    if (minute > 19*60) minute = 37*60 - minute;
    var waitTime = Math.floor(minute / 20) - 19;
    if (minute > 11*60 && minute <= 13*60) waitTime *= 0.8;
    if (minute > 17*60 && minute <= 19*60) waitTime *= 0.8;
    return Math.floor(waitTime);
}


/* Convert an int like 830 into a string "8:30am". */
function hhmmToTimeStr(hhmm) {
    var simMinute = (Math.floor(hhmm / 100) * 60) + hhmm % 100;
    return simMinuteToTimeStr(simMinute);
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


