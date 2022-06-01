import {LitElement, css, html} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';
import * as models from '../models.js';
import './pq-sources.js';

class PQParkPage extends LitElement {
  static get properties() {
    return {
      park: {type: Object},
      ride: {type: Object},
    };
  }

  constructor() {
    super();
    this.park = new models.Park({});
    this.ride = null;
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
       h3 {
        color: #666;
       }

       sl-button {
         margin: 4px;
       }
       sl-button::part(base) {
         width: 110px;
         height: 70px;
         padding: 8px;
         text-align: center;
         line-height: 1.3;
         background: var(--sl-color-fuchsia-800);
         border-radius: 16px;
       }
       sl-button::part(label) {
         white-space: normal;
         color: white;
         font-weight: 300;
         font-size: 14px;
         padding: 0 4px;
       }
       sl-button[fastpass] {
         transform: skew(-5deg);
       }
    `];
  }

  renderFooter() {
    return html`
      <pq-sources .sources=${this.park.sources}></pq-sources>

      <div style="padding: .5em 0" class="unimportant">
	The information presented is unofficial and may be incorrect or out-of-date.
	For official information, visit the park's website or call.
      </div>
      
      <div class="unimportant">
        <a href="mailto:feedback@parkqueues.com">Feedback</a>
      </div>
    `;
  }

  renderRide(ride) {
    return html`
     <sl-button href=${ride.id} size="large"
        ?fastpass=${ride.fastpass}
      >
       ${ride.name}
     </sl-button>
    `;
  }

  renderLand(land) {
    return html`
     <h3>${land.name}</h3>
     ${land.rides.map(this.renderRide.bind(this))}
    `;
  }
  
  render() {
    return html`
      <sl-details summary="Description" open>
       ${this.park.description}
      </sl-details>

      <sl-details summary="Rides" open>
       ${this.park?.lands.map(this.renderLand.bind(this))}
      </sl-details>

      ${this.renderFooter()}
    `;
  }
}

customElements.define('pq-park-page', PQParkPage);


