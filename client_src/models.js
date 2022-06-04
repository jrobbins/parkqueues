// This file defines business objects used on the client side.
// Instead of the elements using JSON objects retrieved from the
// server as-is, we use those JSON objects to construct these objects
// and then use these objects in the custo elements.  The advantage is
// that a lot of the logic for missing fields and formatting URLs, etc.
// can be done here, separately from rendering logic, which makes the
// rendering logic simpler.


// Photos are served from under this URL path.
const ASSET_BASE = "/static/images/";


// Make a new ID based on the object's name.
function makeUid(name) {
  if (name === undefined) return undefined;
  return name.toLowerCase().replace(/[^a-z]/g, "");
}


// This is the list of parks in the world.
export class World {
  constructor(data) {
    this.regions = (data.world || []).map((rd) => new RegionEntry(rd));
  }
}

class RegionEntry {
  constructor(data) {
    this.regionName = data.regionName || "unnamed region";
    this.parks = (data.parks || []).map((pd) => new ParkEntry(pd));
  }
}

class ParkEntry {
  constructor(data) {
    this.name = data.name;
    this.uid = data.uid || makeUid(this.name);
    this.disabled = data.disabled;
  }
}




// This represents an entire park.
export class Park {
  constructor(data) {
    this.name = data.name;
    this.uid = data.uid || makeUid(this.name);
    this.description = data.description || "missing description";
    if (data.sign === null || data.name === undefined) {
      /* We can explicitly null it out to avoid a 404. */
      this.signUrl = null;
    } else {
      /* Otherwise, assume every park has a sign. */
      this.signUrl = ASSET_BASE + this.uid + "/park_sign.jpg";
      this.signUrl05 = ASSET_BASE + this.uid + "/park_sign@05x.jpg";
      if (data.sign) {
        this.signCredit = sourceLabel(data.sign);
        this.signCreditUrl = data.sign;
      }
    }
    
    const lands = data.lands || [];
    this.lands = lands.map((land) => new Land(land, this));
  
    const sources = data.sources || [];
    this.sources = sources.map((s) => {
      return { href: sourceHref(s), label: sourceLabel(s) };
    });

    const allRides = {};
    for (const land of this.lands) {
      for (const ride of land.rides) {
	allRides[ride.id] = ride;
      }
    }
    this.rides = allRides;
  }
}


// This represents a land within a park.
class Land {
  constructor(data, park) {
    data = data || {};
    this.name = data.name || "unnamed land";
    this.uid = data.uid || makeUid(this.name);
    const rides = data.rides || [];
    this.rides = rides.map((r) => new Ride(r, park));
  }
}


// This represents a ride.
export class Ride {
  constructor(data, park) {
    data = data || {};
    this.name = data.name || "unnamed ride";
    this.id = data.id || makeUid(this.name);
    this.description = data.description || "missing description";
    this.ticket = data.ticket || "C";
    this.plus = data.plus || 0;
    this.fastpass = data.fastpass;
    this.singlerider = data.singlerider;
    this.facts = data.facts || [];
    this.tips = data.tips || [];
    const sources = data.sources || [];
    this.sources = sources.map(function(s) {
      return { href: sourceHref(s), label: sourceLabel(s) }})

    if (data.sign === null || data.name === undefined) {
      /* We can explicitly null it out to avoid a 404. */
      this.signUrl = null;
    } else {
      /* Otherwise, assume every ride has a sign. */
      this.signUrl = ASSET_BASE + park.uid + "/" + this.id + "/sign.jpg";
      this.signUrl05 = ASSET_BASE + park.uid + "/" + this.id + "/sign@05x.jpg";
      if (data.sign) {
        this.signCredit = sourceLabel(data.sign);
        this.signCreditUrl = data.sign;
      }
    }

    this.queueSteps = (data.queueSteps || []).map((qs) =>
      new QueueStep(qs, this, park, "queue"));

    const triviaSources = data.triviaSources || [];
    this.triviaSources = triviaSources.map((s) => {
      return { href: sourceHref(s), label: sourceLabel(s) }});

    const gallery = data.gallery || [];
    this.gallery = gallery.map((photo_data) =>
      new Photo(photo_data, this, park, "gallery"));
    const galleryLinks = makeGalleryLinks(data.galleryLinks, this, park);
    this.galleryLinks = galleryLinks.map((link) => {
      return {href: link, label: sourceLabel(link)};
    });
  }
}


function makeGalleryLinks(galleryLinks, ride, park) {
  const q = park.name + " " + ride.name;
  var linkDict = {
    google: "https://www.google.com/images?q=" + q,
    flickr: "https://www.flickr.com/search?text=" + q,
    pinterest: "https://www.pinterest.com/search/pins/?q=" + q,
    youtube: "https://www.youtube.com/results?search_query=" + q,
  };
  /* update */
  return Object.keys(linkDict).sort().map(function(key) {
    return linkDict[key];
  });
}

// For a question/answer pair, the json has both in one string with
// the "?" separating them.
function splitQuestion(t) {
  const lastQM = t.lastIndexOf("?");
  if (lastQM == -1)
    return { q: t, a: null };

  return { q: t.slice(0, lastQM+1), a: t.slice(lastQM+1) };
}

// For photos from the web (e.g., https://flicker.com/photos/USER/12345),
// we serve it from our server under the same name (e.g., 12345.jpg)
function photoName(url) {
  return url.slice(url.lastIndexOf("/") + 1);
}

// This represents a photo for a ride queue step or gallery item.
class Photo {
  constructor(data, place, park, dir) {
    // If these are defined, use them.
    this.image = data.image;
    this.image05 = data.image05 || data.image;
    this.caption = data.caption;
    
    this.cssHeight = data.cssHeight || "75%";
    if (typeof data == "string" && data.split(",").length == 2) {
      this.cssHeight = data.split(",")[1];
      if (this.cssHeight == "p") this.cssHeight = "125%";
      data = data.split(",")[0];
    }
    const prefix = ASSET_BASE + park.uid + "/" + place.id + "/" + dir + "/";
    const prefix05 = ASSET_BASE + park.uid + "/" + place.id + "/" + dir + "/";
    if (typeof data == "number") {
      this.remaining = data;
      this.image = prefix + this.remaining + ".jpg";
      this.image05 = prefix05 + this.remaining + "@05x.jpg";
    } else if (typeof data == "string" && data.indexOf("http") == 0) {
      this.image = prefix + photoName(data) + ".jpg";
      this.image05 = prefix05 + photoName(data) + "@05x.jpg";
      this.credit = sourceLabel(data);
      this.creditUrl = data;
    } else if (typeof data == "string") {
      var filename = data;
      this.image = prefix + filename + ".jpg";
      this.image05 = prefix05 + filename + "@05x.jpg";
      this.credit = null;
      this.creditUrl = null;
    } else if (typeof data.ispy == "string" && data.ispy.indexOf("http") == 0) {
      this.image = prefix + photoName(data.ispy) + ".jpg";
      this.image05 = prefix05 + photoName(data.ispy) + "@05x.jpg";
      this.credit = sourceLabel(data.ispy);
      this.creditUrl = data.ispy;
    } else if (typeof data.ispy == "string") {
      var filename = data.ispy;
      this.image = prefix + filename + ".jpg";
      this.image05 = prefix05 + filename + "@05x.jpg";
      this.credit = null;
      this.creditUrl = null;
    } else if (data.filename || data.remaining) {
      this.image = prefix + (data.filename || data.remaining) + ".jpg";
      this.image05 = prefix05 + (data.filename || data.remaining) + "@05x.jpg";
    }
  }
}


// One milestone in the queue where people wait to get on a ride.
class QueueStep {
  constructor(data, place, park, dir) {
    this.photo = new Photo(data, place, park, dir);
    if (typeof data == "number") {
      this.remaining = data;
    } else if (data.remaining) {
      this.remaining = data.remaining;
    }

    const trivia = data.trivia || [];
    this.trivia = trivia.map(splitQuestion);

    if (data.ispy) {
      this.photo.caption = "Where in the park?";
      this.trivia = [{
	q: data.q || "What is shown in this picture?",
	a: data.a
      }];
      this.cls = "ispy";
    }    
  }
}



// When citing the source of information about a park, we usually just
// use the main part of the domain name.  E.g., any Wikipedia article
// would use link text "Wikipedia".

const SOURCE_LABEL_RE_LIST = [
  { pat: /http(s)?:[/][/]www.flickr.com[/]photos[/]([-_a-zA-Z0-9]+)[/]\d+/,
    idx: 2,
    capitalize: false },
  { pat: /http(s)?:[/][/](.*[.])?([-a-zA-Z0-9]+)[.](com|net|org)/,
    idx: 3,
    capitalize: true }
];

function sourceLabel(source) {
  if (!source) return null;
  if (source.label) return source.label;
  for (let srcRule of SOURCE_LABEL_RE_LIST) {
    var m = source.match(srcRule.pat);
    if (m) {
      var name = m[srcRule.idx];
      if (srcRule.capitalize && name == name.toLowerCase()) {
	name = name.charAt(0).toUpperCase() + name.slice(1);
      }
      return name;
    }
  }
  return source;
}


function sourceHref(source) {
  if (source.href) return source.href;
  if (source.indexOf("http") == 0) return source;
  else return false;
}
