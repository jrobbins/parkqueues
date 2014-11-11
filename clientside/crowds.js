"use strict";

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
