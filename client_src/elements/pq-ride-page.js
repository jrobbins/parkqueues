import {LitElement, css, html, nothing} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';
import * as models from '../models.js';
import './pq-photo-block.js';
import './pq-queue-step.js';
import './pq-sources.js';


class PQRidePage extends LitElement {
  static get properties() {
    return {
      park: {type: Object},
      ride: {type: Object},
    };
  }

  constructor() {
    super();
    this.park = null;
    this.ride = null;
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
    `];
  }

  renderDescription() {
    return html`
       ${this.ride.description}

       <ul>
        ${this.ride.facts.map((fact) => html`
          <li>${fact[0]}: ${fact[1]}</li>
        `)}
       </ul>

      <pq-sources .sources=${this.ride.sources}>
      </pq-sources>
    `;
  }

  renderQueue() {
    if (this.ride.queueSteps.length == 0) {
      return html`
	<p>This ride does not have any queue photos.</p>
      `;
    }
    
    return html`
      ${this.ride.queueSteps.map((step) => html`
        <pq-queue-step .step=${step}></pq-queue-step>
      `)}

      <div style="padding: .5em 0" class="unimportant">
        Remaining queue time estimates are based on photo timestamps on a 
        busy day when the ride was operating at full capacity.
      </div>

      <pq-sources name="Trivia sources" .sources=${this.ride.triviaSources}>
      </pq-sources>
    `;
  }

  renderGallery() {
    if (this.ride.gallery.length == 0) {
      return html`
	<p>This ride does not have any gallery photos.</p>
      `;
    }
    
    return html`
      ${this.ride.gallery.map((photo) => html`
         <pq-photo-block .photo=${photo}></pq-photo-block>
      `)}

      <div style="padding: .5em 0" class="unimportant">
        All images are from sources that permit reuse.
      </div>

      ${this.ride.galleryLinks.length > 0 ? html`
        <div class="unimportant">
	  More photos on the web:
	  <ul>
            ${this.ride.galleryLinks.map((link) => html`
              <li><a href="${link.href}" target="_blank">${link.label}</a></li>
	    `)}
	  </ul>
        </div>`
        : nothing }
    `;
  }

  render() {
    if (this.ride == null) {
      return html`
        <p>Loading Ride...</p>
      `;
    }

    return html`
      <sl-details summary="Description" open>
        ${this.renderDescription()}
      </sl-details>

      <sl-details summary="Queue" open>
        ${this.renderQueue(this.ride.queueSteps)}
      </sl-details>

      <sl-details summary="Gallery" open>
        ${this.renderGallery(this.ride.gallery)}
      </sl-details>
    `;
  }
}

customElements.define('pq-ride-page', PQRidePage);
