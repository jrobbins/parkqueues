"use strict";

// This is a simple JS object to represent an entire park.

function Park(data) {
    data = data || {};
    this.uids = {};

    this.name = data.name || "unnamed park";
    this.uid = data.uid || makeUid(this.name);
    this.description = data.description || "missing description";
    this.openHhmm = data.openHhmm || 800;
    this.regions = data.regions || [];
    this.closeHhmm = data.closeHhmm || 2100;
    this.closures = data.closures || [];
    var this_park = this;
    var lands = data.lands || [];
    this.lands = lands.map(function(land) { return new Land(land, this_park); });

    this.schedule_parts = classify_shows_by_day_part(all_shows(this));
}

function register_uid(park, item) {
    if (park.uids[item.uid]) {
	console.log('Item with ' + item.uid + ' is already registered.');
    } else {
	park.uids[item.uid] = item;
    }
}


function all_shows(park) {
    var shows = [];
    for (var land of park.lands) {
	shows.push.apply(shows, land.shows);
    }
    return shows;
}


var DAY_PARTS = [
  {part_name: 'Morning', start: 0, end: 1100},
  {part_name: 'Noontime', start: 1100, end: 1330},
  {part_name: 'Afternoon', start: 1330, end: 1700},
  {part_name: 'Evening', start:1700, end: 2000},
  {part_name: 'Night', start: 2000, end: 2400}];


function classify_shows_by_day_part(shows) {
    var start = 0;
    return DAY_PARTS.map(function(day_part) {
      return {
        part_name: day_part.part_name,
        shows: shows_in_day_part(shows, day_part)
      };
    });
}


function shows_in_day_part(shows, day_part) {
    var schedule_part = [];
    for (var show of shows) {
	var times_in_part = show.times.filter(function (t) {
		return t > day_part.start && t <= day_part.end;
	    });
	if (times_in_part.length) {
	    schedule_part.push({name: show.name, times: times_in_part});
	}
    }
    return schedule_part;
}


function makeUid(name) {
    return name.toLowerCase().replace(/[^a-z]/g, "");
}


function Land(data, park) {
    data = data || {};
    this.name = data.land_name;
    this.uid = data.uid || makeUid(this.name);
    var rides = data.rides || [];
    this.rides = rides.map(function(r) { return new Ride(r, park); });
    var shows = data.shows || [];
    this.shows = shows.map(function(s) { return new Show(s, park); });

    register_uid(park, this);
}

function Ride(data, park) {
    data = data || {};
    this.name = data.name || "unnamed ride";
    this.uid = data.uid || makeUid(this.name);
    this.description = data.description || "missing description";
    this.ticket = data.ticket || "C";
    this.plus = data.plus || 0;
    this.fastpass = data.fastpass;
    this.singlerider = data.singlerider;
    this.facts = data.facts || [];
    this.tips = data.tips || [];

    if (data.sign_url === null)
      this.sign_url = null;
    else
      this.sign_url = "/images/" + park.uid + "/" + this.uid + "_sign.jpg";

    register_uid(park, this);
}


function Show(data, park) {
    data = data || {};
    this.name = data.name || "unnamed show";
    this.uid = data.uid || makeUid(this.name);
    this.description = data.description || "missing description";
    this.facts = data.facts || [];
    this.times = data.times || [];

    register_uid(park, this);
}


function Restaurant(data, park) {
    data = data || {};
    this.name = data.name || "unnamed restaurant";
    this.uid = data.uid || makeUid(this.name);
    this.description = data.description || "missing description";
    this.facts = data.facts || [];
    this.menu = data.menu || [];

    register_uid(park, this);
}
