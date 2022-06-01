import {LitElement, css, html, nothing} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';

class PQSources extends LitElement {
  static get properties() {
    return {
      name: {type: String},
      sources: {type: Array},
    };
  }

  constructor() {
    super();
    this.name = "Sources";
    this.sources = [];
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
      `
    ];
  }

  render() {
    if (this.sources.length == 0) {
      return nothing;
    }

    return html`
      <p class="unimportant">
       ${this.name}:
       ${this.sources.map((s) => html`
         <a href=${s.href} class="comma-sep">${s.label}</a>
       `)}
      </p>
    `;
  }
}

customElements.define('pq-sources', PQSources);

      
