import {LitElement, css, html} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';

class PQSplash extends LitElement {
  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
    `];
  }

  render() {
    return html`
      <h2>Splash!</h2>

      <a href="disneylandca/">Continue</a>
    `;
  }
}

customElements.define('pq-splash', PQSplash);


