# 2022 Redo Goals
* Keep the app working for the future (in some form)
* Pivot the app to a reduced scope
* Gain experience with implementing a lit SPA

# New app scope
* "The only app that makes wait times seem shorter"
* Focus on in-queue experience
 - Trivia questions and mini-games, the quality and quantity of this will determine success
 - Remaining wait time from this point in line
* North star metrics:
 - Number of visitors
 - Number of page views
 - Number of trivia taps
 - Number of user submissions
 - Percentage completion: (10 milestones + 20 trivia) * 22 rides * 30 parks  (* 30 22 30) = 19800 items
* Remove wait time estimates, weather, calendar, dining, shows, park hours
* Make the rides tab be the only tab
* IA is Region > Park > Land > Ride > {Facts*, {Milestone | Trivia}*, Gallery}
* Trivia is associated with ride, but can be logically relaed to region, park, land, and ride

# New technical scope
* Implement a lit SPA
* Maybe use service-worker
* Python on appengine, but 99% static files
* Aim for very low operational effort

# Longevity
* The site should run (and work well) for many years if abandonded
* But, rides change, e.g., marvel campus replaced bugs land
* Wait times change, e.g., with genie+
* We would need mods to handle user submissions


# New implementation details
* debug.html loads each file individually for debugging
* / or index.html loads compiled JS via rollup
* Tiny flask app using datastore, py3 with legacy appengine library
* JSON data in JS for easier formatting and comments
* Agressive HTTP cacheing of images, and JS and CSS with a cache-buster query string arg
* Maybe some pre-generation of content files
 - index.html with the cache-buster
 - JSON data files for index.html

# Wait-time estimates
* We still have remaining time estimates (RTE), that could be accurate or not
* Represent RTE as percentage of time from gate to boarding, can be over 100 for temporary queue area
* Each ride needs an estimated number of minutes when the queue extends all the way to the gate
* FP ratio is hard-coded for each hour of the day, day of week, and month of year
* Users can provide anon feedback, e.g., way too low, too low, right, too high, way too high
* currentWaitAtGate = ride.waitAtGate * (ride.fp || 1) * fastPasses[timeOfDay]

# Info for parks that I have never visited
* Learn about rides from public sources, e.g., websites
* Users can submit queue photos to a review queue?
* Users can submit suggested trivia questions and answers?

# Is it compelling?
* Is focusing on the number of minutes remaining really a good way to manage your kid's moods?
* Is there enough trivia to keep kids occupied for a significant fraction of time?
* Would adult fans enjoy using it?
* Would adult fans use it when not at a park?
* What about parks that have nondescript queues?
* Will users be satisfied with 1/2 the rides and rough accuracy?
* Basically, it needs to be compelling as a trivia app
* Most parks don't really have enough trivia
  - Tie in to movie trivia, city trivia, sports?
* How much trivia do I need:
  - (* 10 22 30) = 6600  for 30 parks world-wide
  - (* 20 22 14) = 6160  for just better coverage at disney parks
  - Too much for me to do alone, but maybe I can attract contributions
* Would adult fans enjoy contributing?  How many would be needed?

# Hypothetical revenue model
* Ads in the queues
* Tips, patreon?
* Affiliate links?
* Sell a book?
* Dating app?



# URL space
* / Homepage and splash
* /debug.html development homepage
* /disneylandca UI for a park w/ a list of rides
* /disneylandca/splashmountain UI for a ride queue
* /static/images/disneylandca/splashmountain/sign.jpg  Image for ride sign
* /static/images/disneylandca/splashmountain/queue/77@05.jpg  Low-res image for 77% of the queue remaining
* /static/images/disneylandca/splashmountain/queue/77.jpg  Image for 77% of the queue remaining
* /static/images/disneylandca/splashmountain/gallery/filename@05.jpg  Low-res image in ride gallery
* /static/images/disneylandca/splashmountain/gallery/filename.jpg  Image in ride gallery

* /settings  settings page
* /static unprocessed clientside HTML, CSS, IMG
* /dist compiled



# Source code organization
+ app.yaml
+ main.py
+ server_src/submission.py
+ client_src/index.js
+ client_src/elements/element-name.js
+ client_src/data/parks.js
+ client_src/data/disneylandca.js
+ static/index.html
+ static/images
+ dist/index.js
+ templates/debug.html


# Next steps
1. X Try deploying current code.
 - Fail.  Exceeds limit of 10000 files.  node_modules alone is more than 10000 files.
 - I will need to use rollup before I can even deploy.
1. X Set up py3 app to serve debug.html.
1. X Set up tiny JSON API and JS client.
1. X Set up lit SPA with menu, ride list page, and ride-queue page
 - X Set up router and park menu
 - X Set up ride-list page
 - X Set up ride-queue page
 - X Set up the photo block element
 - X set up the queue step element

1. X Get all navigation working.
1. X Get all images showing.
1. X Get trivia showing.

1. @ Add parkdata that I had in the old version
1. Test deployment at a non-live GAE version
1. Delete old code


1. Set up py3 unit tests and JS unit tests.
1. Splash page.
1. Replace existing app with new app.


# Later
1. add CSP and nonce
1. redo time estimates based on percentage of gate-wait.
1. add a park crowding factor based on time of day and day of year
1. Implement a simple feedback channel for  users
1. analytics
