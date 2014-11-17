"use strict";

/* Wait time estimation works like this:
   1. We need the daily max crowd level from the calendar.  This itself is
      estimated based on rules about seasons, holidays, days of the week,
      weather, and local events.  Crowd levels are 0..100 meaning a percentage
      of park capacity.
   2. We estimate the crowd level based on crowd level for any minute of the day.
      This is based on entry gate rate, meal times, sunset, and closing time.
   3. Each ride has a "Ticket" that shows how popular it is.
   4. We look up the daily demand curve based on the ticket.
*/


var SUN = 0, MON = 1, TUE = 2, WED = 3, THU = 4, FRI = 5, SAT = 6;

var CROWD_RULES = [
  { "regionName": "ALL",
    "rules": {
      "Baseline": {size: 30},
      "Sunday": {size: 25, day: SUN},
      "Monday": {size: 10, day: MON},
      "Friday": {size: 20, day: FRI},
      "Saturday": {size: 30, day: SAT}
      }},
  { "regionName": "US",
    "rules": {
      "New Years": {size: 65, dates: [ 101,  105]},
      "MLK Day": {size: 30, dates: [ 119,  121]},
      "Presidents' Day": {size: 30, dates: [ 216,  218]},
      "Spring Break": {size: 45, dates: [ 401,  425]},
      "Easter": {size: 10, dates: [ 420,  424]},
      "Cinco de Mayo": {size: 10, dates: [ 505,  505]},
      "Summer": {size: 40, dates: [ 601,  905]},
      "Independence Day": {size: 50, dates: [ 703,  705]},
      "Labor Day": {size: 50, dates: [ 828,  903]},
      "Columbus Day": {size: 10, dates: [1012, 1014]},
      "Thanksgiving": {size: 40, dates: [1120, 1131]},
      "Holidays": {size: 30, dates: [1201, 1220]},
      "Christmas": {size: 65, dates: [1221, 1231]}
      }},
  { "regionName": "DLR",
    "rules": {
      "Gay Days": {size: 10, dates: [1003, 1005]},
      "Holloweentime": {size: 20, dates: [ 926, 1102]},
      "Fall Dapper Day": {size: 10, dates: [ 917,  919]},
      "Spring Dapper Day": {size: 10, dates: [ 228,  302]}
      }}
];


/* Return a number that indicates how crowded the park will be.  More or less in the
   range 0..100. */
function dailyCrowds(park, date) {
    var crowd = 0;  // in percent of max park capacity
    var reasons = dailyReasons(park, date);
    for (var reason in reasons)
	crowd += reasons[reason].size;
    return Math.min(crowd, 100);
}


/* Return a dict {reason: rule} for all the reasons why the park will be crowded on the
   given date. The rule has a size field giving the percentage of capacity added.  */
function dailyReasons(park, date) {
    var parkRegionNames = ["ALL"];
    Array.prototype.push.apply(parkRegionNames, park.regions);	

    var rules = {};
    for (var regionName of parkRegionNames)
	for (var ruleset of CROWD_RULES)
	    if (regionName == ruleset.regionName) 
		for (var reason in ruleset.rules)
		    rules[reason] = ruleset.rules[reason];

    for (var reason in park.crowdRules)
	rules[reason] = park.crowdRules[reason]	
    
    var groups = {};
    for (var reason in rules)
	if (checkCondition(date, rules[reason]))
	    groups[reason] = rules[reason];

    return groups;
}
    

/* Return true if the date fits the conditions of a rule. */
function checkCondition(date, rule) {
    if (rule.dates) {
	var mmdd = (date.getMonth() + 1) * 100 + date.getDate();
	if (mmdd < rule.dates[0] || mmdd > rule.dates[1])
	    return false;
    }
    if (rule.day != undefined && rule.day != date.getDay())
	return false;

    return true;
}


// Assume fill rate of 1% per minute for first 20% of the daily crowd,
// then 0.5% for the next 40% of the daily crowd, and the final 40% of
// the crowd comes in at .25% per minute.  E.g., a 30% day fills to 6%
// in 6 minutes, then takes another 24 minutes to reach add 12% and
// reach 18%.  It takes another 48 minutes to reach the full 30%,
// which is 78 minutes after park opening.  A 100% day fills to 20% in
// 20 minutes and adds another 40% after 80 minutes, so it is 60% full at
// 100 minutes after opening.  The last 40% of people come in over the next
// 160 minutes.  So, it reaches 100% after 260 minutes (4 hours and 20 minutes).
// Draining the park does the same thing in reverse.
var FILL_RATE_BRACKETS = [[1.0, 0.20], [0.50, 0.40], [0.25, 0.40]];


// A Gate Table is an array of floats that show the cummulative percentage
// of park capacaity that has passed through the gates as of that minute
// since the park opened.  E.g., in the zero-th minute 0% of people have gone
// through the gates.   If the park will reach 50% max capacity that day,
// the first 20% of that 50% = 10% will pass through in the first 10 minutes,
// so the next 10 entries are 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10.  Then, 40%
// of the 50% = 20% pass through at the rate of .5 per minute, so the next
// 40 entries are 10.5, 11, 11.5, 12, 12.5, etc. up to 30.
function generateGateTable(maxCrowds) {
    var gateTable = [0];
    for (var bracket of FILL_RATE_BRACKETS) {
	var fillRate = bracket[0];
	var crowdInBracket = Math.floor(maxCrowds * bracket[1]);
	var minutesInBracket = Math.floor(crowdInBracket / fillRate);
	for (var i = 0; i < minutesInBracket; i++) {
	    gateTable.push(gateTable[gateTable.length - 1] + fillRate);
	}
    }

    return gateTable;
}


function cumulativeGate(minutesSinceOpen, gateTable) {
    if (minutesSinceOpen > gateTable.length) {
	return gateTable[gateTable.length - 1];
    }
    return gateTable[minutesSinceOpen];
}



function minuteCrowds(park, maxCrowds, simMinute) {
    var openMinute = hhmmToSimMinute(park.openHhmm);
    var closeMinute = hhmmToSimMinute(park.closeHhmm);
    if (simMinute < openMinute || simMinute > closeMinute) return 0;

    // TODO: handle magic mornings
    var minutesSinceOpen = simMinute - openMinute;
    var minutesUntilClose = closeMinute - simMinute;
    var gateTable = generateGateTable(maxCrowds);

    var minuteCrowd =  Math.min(cumulativeGate(minutesSinceOpen, gateTable),
				cumulativeGate(minutesUntilClose, gateTable));
    // TODO: lunch and dinner lulls
    return minuteCrowd;
}


var MAX_WAIT_TIMES = {
    'A': 20,
    'B': 30,
    'C': 45,
    'D': 60,
    'E': 75,
    'F': 120,
    'G': 180
}


/* Estimate the wait time for a ride... magic... */
function waitTime(minuteCrowds, ticket) {
    console.log('called waitTime(' + minuteCrowds + ', ' + ticket);
    return Math.floor(MAX_WAIT_TIMES[ticket] * minuteCrowds / 101) + 1;
}


function standbyTime(park, ride, date, simMinute) {
    var maxCrowdLevel = dailyCrowds(park, date);
    var minuteCrowdLevel = minuteCrowds(park, maxCrowdLevel, simMinute);
    var result = waitTime(minuteCrowdLevel, ride.ticket);
    result += ride.plus;
    return Math.max(1, result);
}
    
