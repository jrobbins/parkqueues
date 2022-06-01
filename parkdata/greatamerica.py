FAMILY_RIDES = [
  { "name" : "Barney Speedway", "ticket" : "A", "sign_url": None },
  { "name" : "Rip Roaring Rapids", "ticket" : "B", "sign_url": None },
  { "name" : "Rue Le Dodge", "ticket" : "B", "sign_url": None },
  { "name" : "Star Tower", "ticket" : "B" },
  { "name" : "Carousel Columbia", "ticket" : "B" },
  { "name" : "Celebration Swings", "ticket" : "B" },
  { "name" : "Mumble's Wild Ride", "ticket" : "B", "sign_url": None },
  { "name" : "Woodstock Express", "ticket" : "B", "sign_url": None },
  { "name" : "Whitewater Falls", "ticket" : "B" },
  { "name" : "Flying Eagles", "ticket" : "B" },
  { "name" : "Eagle's Flight", "ticket" : "B", "sign_url": None },
  { "name" : "Loggers Run", "ticket" : "C", "sign_url": None },
  { "name" : "Psycho Mouse", "ticket" : "C", "sign_url": None }
]

THRILL_RIDES = [
  { "name" : "Gold Striker", "ticket" : "C" },
  { "name" : "The Grizzly", "ticket" : "C", "sign_url": None },
  { "name" : "FireFall", "ticket" : "C" },
  { "name" : "Tiki Twirl", "ticket" : "C", "sign_url": None },
  { "name" : "The Demon", "ticket" : "C" },
  { "name" : "Drop Tower", "ticket" : "C", "sign_url": None },
  { "name" : "H.M.B. Endeavor", "ticket" : "C", "sign_url": None },
  { "name" : "Flight Deck", "ticket" : "D" },
  { "name" : "Delirium", "ticket" : "D" },
  { "name" : "Vortex", "ticket" : "D" },
  { "name" : "Xtreme Skyflyer", "ticket" : "D" }
]

  
PLANET_SNOOPY_RIDES = [
  { "name" : "Woodstock Express", "ticket" : "C", "sign_url": None },
  { "name" : "PEANUTS Pirates", "ticket" : "B", "sign_url": None },
  { "name" : "Love Buggies", "ticket" : "A", "sign_url": None },
  { "name" : "Pumpkin Patch", "ticket" : "A", "sign_url": None }
]

KIDZVILLE_RIDES = [
  { "name" : "Classic Cars", "ticket" : "A", "sign_url": None },
  { "name" : "Fender Bender 500", "ticket" : "A", "sign_url": None },
  { "name" : "Ghost Chase", "ticket" : "B", "sign_url": None },
  { "name" : "Junior Jump Club", "ticket" : "B", "sign_url": None },
  { "name" : "KidZville Pet Shop", "ticket" : "B", "sign_url": None },
  { "name" : "KidZair", "ticket" : "B", "sign_url": None },
  { "name" : "Snail Races", "ticket" : "B", "sign_url": None },
  { "name" : "Swing Swing Swing", "ticket" : "C", "sign_url": None },
  { "name" : "Taxi Jam", "ticket" : "C", "sign_url": None }
]

BOOMERANG_BAY_RIDES = [
  { "name" : "Tasmanian Typhoon", "ticket" : "B", "sign_url": None },
  { "name" : "Castaway Creek", "ticket" : "B", "sign_url": None },
  { "name" : "Screamin' Wombat", "ticket" : "B", "sign_url": None },
  { "name" : "Great Barrier Reef", "ticket" : "C", "sign_url": None },
  { "name" : "Kookaburra Cay", "ticket" : "B", "sign_url": None },
  { "name" : "Jackaroo Landing", "ticket" : "C", "sign_url": None },
  { "name" : "Didgeridoo Falls", "ticket" : "C", "sign_url": None },
  { "name" : "Down Under Thunder", "ticket" : "D", "sign_url": None },
  { "name" : "Ripsnort Ridge", "ticket" : "D", "sign_url": None }
]


PARK = {
  "name": "Great America",
  "description": "Bay Area's most exciting theme park",

  "sources": [
    "https://www.cagreatamerica.com/",
    "http://en.wikipedia.org/wiki/California%27s_Great_America"
  ],


  "lands": [
    { "name": "Family Rides",
      "rides": FAMILY_RIDES },
    { "name": "Thrill Rides",
      "rides": THRILL_RIDES },
    { "name": "Planet Snoopy",
      "rides": PLANET_SNOOPY_RIDES },
    { "name": "KidZville",
      "rides": KIDZVILLE_RIDES },
    { "name": "Boomerang Bay",
      "rides": BOOMERANG_BAY_RIDES },
  ],
}
