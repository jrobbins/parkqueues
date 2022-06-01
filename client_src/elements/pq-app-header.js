import {LitElement, css, html} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';
import * as models from '../models.js';

class PQAppHeader extends LitElement {
  static get properties() {
    return {
      world: {type: Object},
      park: {type: Object},
      ride: {type: Object},
    };
  }

  constructor() {
    super();
    this.world = new models.World({});
    this.park = {};
    this.ride = null;
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
      header {
        background: var(--sl-color-primary-800);
        color: white;
        display: flex;
      }
      .nav-button {
        font-size: 1.5rem;
        margin: 8px;
      }
      .nav-button::part(base) {
        color: white;
      }
      h1 {
        flex: 1;
        margin: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      ul ul {
        padding-left: 8px;
      }
      .park-item {
        padding: 8px 24px;
        margin: 4px;
      }
      .park-item[disabled] {
        color: #999;
      }
      .park-item[active] {
        background: var(--sl-color-primary-100);
        border-radius: 16px;
      }
      .park-item a {
        text-decoration: none;
      }
    `];
  }

  toggleDrawer() {
    console.log('toggle');
    const drawer = this.shadowRoot.querySelector('sl-drawer');
    drawer.open = !drawer.open;
  }

  renderParkMenuItem(parkEntry) {
    if (parkEntry.disabled) {
      return html`
        <li class="park-item" disabled>${parkEntry.name}</li>
      `;
    } else {
      return html`
        <li class="park-item"
            ?active=${parkEntry.uid == this.park.uid}>
          <a href="/${parkEntry.uid}"}>
            ${parkEntry.name}
          </a>
        </li>
      `;
    }
  }

  renderRegion(region) {
    return html`
        <ul>
          <li><b>${region.regionName}</b></li>
          <ul>
            ${region.parks.map(this.renderParkMenuItem.bind(this))}
          </ul>
        </ul>
    `;
  }
  
  render() {
    const backButton = html`
      <sl-icon-button id="back-button" class="nav-button" name="arrow-left" 
                      label="Back to park"
         href="./"
      ></sl-icon-button>
    `;
    const mainMenuButton = html`
      <sl-icon-button id="main-menu-button" class="nav-button" name="list" 
                      label="Main menu button"
         @click=${this.toggleDrawer}
      ></sl-icon-button>
    `;
    return html`
      <header>
        ${this.ride ? backButton : mainMenuButton}
        <h1>${this.ride ? this.ride.name : this.park.name}</h1>
      </header>

      <sl-drawer label="Park Queues" id="main-menu" placement="start">
        ${this.world.regions.map(this.renderRegion.bind(this))}
      </sl-drawer>
    `;
  }
}

customElements.define('pq-app-header', PQAppHeader);


