Theme Park Queues

This is just an experiment for learning how to build a mobile web app
using polymer.

The basic idea is to build a theme park web app that shows estimated
ride wait times and a bunch of static info.  There are many apps like
that available on the web and on Android, and many of the official
theme park websites have pretty good static info.  The main unique
thing about this is simply that it is implemented in polymer with
material design.  As such, it is a chance for me to learn how to build
this kind of web app.


BASIC FUNCTIONALITY:
 + Choose park from main app menu
 + Browse through four main tabs:
   - Park info and hours
   - Ride wait times
   - Show schedule
   - Food places
 + Clicking through a ride, show, or food place will give more details and photos


PLANNED KILLER FEATURES:
 + Material design: cards, tall titles with photos
 + Choose from about 40 theme parks, even ones that I have never visited
 + Ride wait times displayed in a compact format for less scrolling
 + Ride queue remaining-time estimates and photos
 + Estimates for any time on any day: interactive charts and crowd calendar
 + Park and ride trivia and games
 + Most features work without needing network connectivity (after park info loaded)


TRADEMARKS AND COPYRIGHTS

The names of the theme parks and the rides are generally trademarked.
People are allowed to use trademarks when referring to the thing that
is trademarked, which is what this app am doing.  I have also included a
visible footnote that states that trademarks are held by their owners,
not me.  Many existing fan websites and apps use trademark names
without problems.

To avoid copyright issues with description text and photos, I intend
to either write the text myself and use photos that I took myself, or
use purely creative commons content from wikipedia and give credit.  If
I get any info from official sites, I will be sure to follow their
robots.txt files.

Park hours, ride closures, entertainment show times, etc. can only be
obtained from the theme park websites or other official sources.  I
will use any such info in compliance with the site terms of service.
Other theme park apps seem to do this currently.  In cases where the
info cannot be obtained, my site will just offer users a hyperlink to
the official site.


WHY RELEASE IT?
+ To use it myself: since it is just a website, serving the site == releasing the code
+ To show off a sweet responsive UI: to give a lasting outlet to a creative expression
+ So that people can use it, and get their reactions to see if my design insights were good
+ So that I can work through various polymer examples and ask for help in reference to a released website
+ To teach my nephew how to build polymer sites with a specific example
+ I might want to continue to hack on it even if I leave Google someday
+ Probably not OSS at first because I don't want someone else getting ahead of me,
  e.g., packaging it as an android app while I am still working on the web app



  

IMPLEMENTATION NOTES

Architecture:
  Single page web application using Javascript and Polymer
  Backend in GAE python serves only JSON and static clientside assets
  Currently GAE serves only static JSON files, there is no python code

Requests:
  One request for the list of parks.
  One park loaded at a time.
  + All static data in one request, including forever schedule.
  + Second request for overlay data.   Keep requesting every 10 minutes.

Source code organization:
  clientside:  index.html, css, misc js
    components: standard polymer core and paper elements, checked out via bower
    elements: custom polymer elements implemented for this web app
    services: custom polymer elements to communicate to server
    models: js classes for business objects
  serverside: app.yaml and other GAE config, for now .json files are just static

  
