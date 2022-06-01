// Shoelace components
// css is imported via _base.html in base.css, built by gulpfile.babel.js.
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/static/dist/shoelace');

console.log('loaded all libs');

import { pqClient } from './pq-client.js';
window.pqClient = pqClient;

// The custom elements that make up our app.
import './elements/pq-app.js';



console.log('loaded all of index.js');
const app = document.querySelector('pq-app');
window.pqClient.getRegionsAndParks().then(
  (world) => app.setWorld(world));
app.setParkAndRide(app.parkUid, app.rideId);
