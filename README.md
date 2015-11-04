## bobcat

MEAN stack plus d3.js to visualize flow of rental bikes across London

## What
This project was intended to be a learning exercise to help get to grips with the basics of Angular.js, Leaflet.js and to use d3.js to help visualize a live data set. The idea originally came from what I believe to be a fairly unclear user interface on the official TFL Santander Cycle hire availability map. I thought I could create a clearer, more user friendly alternative that would offer certain functionality that the TFL site was missing.

##### Features that I want to include that TFL is missing:
  - The ability to clearly see at a single glance how many bikes were available at each docking station
  - The ability to toggle modes depending on if you were searching for a bike to hire or a station to dock your bike at  

##### Other features to add:
  - User profiles so users can store a favourite location that the view defaults to

## How
The data itself comes from TFL and is freely available (if you register as a developer) from https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml as an XML document. The data contains information on every bike docking station in london, including latitude and longitude, the total number of docks and the number of bikes currently available. This data is updated around every two minutes.

If you would like to run this project locally, you can `git clone` the repo from https://github.com/rorysedgwick/bobcat.git and `npm install` the dependencies. You will need a creds.json file of the same structure as creds.example.json, with the sections between <angle-brackets> replaced with your mongolabs database credentials. `npm start` will compile from the /src folder into /public and start the server, making the project available to view at localhost:8000

-----

#### To do:
- [ ] Detailed readme  
- [x] Modularise  
- [x] Set up test framework  
- [ ] Write tests for existing code  
- [x] Set up cloud database (mongolabs?)  
  - [x] Finalise data structure  
  - [x] Populate database with bikepoint details  
- [x] Pull live data from tfl  
- [x] Integrate interactive map (leaflet?)  
- [x] Map bike stations    
- [ ] Include d3 display of available bikes  
- [ ] Flesh out home page with info  
- [ ] Add "updating" animation or signal for user on data refresh  
- [x] Deploy  
- [ ] ??????  
- [ ] Profit  


