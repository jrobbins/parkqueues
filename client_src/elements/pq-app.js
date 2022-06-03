import {LitElement, css, html} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';
import page from 'page';
import * as models from '../models.js';
import './pq-app-header.js';
import './pq-park-page.js';
import './pq-ride-page.js';
import './pq-splash.js';


class PQApp extends LitElement {
  static get properties() {
    return {
      // Park unique ID.
      parkUid: {type: String},
      // Ride ID may be the same as another ride at another park.
      rideId: {type: String},
      // The main element to show on the page.	
      spaPage: {type: String},

      world: {type: Object, state: true},
      park: {type: Object, state: true},
      ride: {type: Object, state: true},
    };
  }

  constructor() {
    super();
    this.parkUid = 'disneylandca';
    this.rideId = null;
    this.spaPage = 'pq-splash';

    this.world = new models.World({});
    this.park = new models.Park({});
    this.ride = null;

    this.parkPageScrollPositon = 0;
  }

  setUpRoutes() {
    page.strict(true);  // Be precise about trailing slashes in routes.

    // SPA routing rules.  Note that rules are considered in order.
    // And :var can match any string (including a slash) if there is no slash after it.
    page('/', this.showSplashOrRedirect.bind(this));
    page('/:parkUid/', this.showParkPage.bind(this));
    page('/:parkUid', (ctx) => {page.redirect(ctx.path + '/')});
    page('/:parkUid/:rideId', this.showRidePage.bind(this));

    page.start();
  }

  setWorld(world) {
    this.world = world;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setUpRoutes();
  }

  setParkAndRide(parkUidParam, rideIdParam) {
    this.parkUid = parkUidParam;
    this.rideId = rideIdParam;
    if (this.parkUid && window.pqClient) {
      if (this.park && this.park.uid == this.parkUid) {
        this.ride = this.park.rides[this.rideId];
      } else {
        window.pqClient.getPark(this.parkUid).then((park) => {
          this.park = park;
	  this.ride = this.park && this.park.rides[this.rideId];
	});
      }
    }
  }

  showSplashOrRedirect(ctx, next) {
    this.parkUid = null;
    this.rideId = null;
    this.spaPage = 'pq-splash';
  }

  showParkPage(ctx, next) {
    this.setParkAndRide(ctx.params.parkUid, null);
    this.spaPage = 'pq-park-page';
  }

  showRidePage(ctx, next) {
    this.parkPageScrollPositon = window.scrollY;
    this.setParkAndRide(ctx.params.parkUid, ctx.params.rideId);
    this.spaPage = 'pq-ride-page';
  }


  updated(changedProperties) {
    if (changedProperties.has('spaPage')) {
      if (this.spaPage == 'pq-park-page') {
	// Scroll after the new page has rendered.
	window.setTimeout(() => { window.scrollTo(0, this.parkPageScrollPositon)}, 0);
      } else {
	window.scrollTo(0, 0);
      }
    }
  }
  
  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
    `];
  }

  render() {
    const mainContentElement = document.createElement(this.spaPage);
    mainContentElement.park = this.park;
    mainContentElement.ride = this.ride;
    
    return html`
      <pq-app-header
        .world=${this.world}
        .park=${this.park}
        .ride=${this.ride}
        ></pq-app-header>

      ${mainContentElement}
    `;
  }
}

customElements.define('pq-app', PQApp);


