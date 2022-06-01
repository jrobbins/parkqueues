import {LitElement, css, html, nothing} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';

class PQPhotoBlock extends LitElement {
  static get properties() {
    return {
      photo: {type: Object},
    };
  }

  constructor() {
    super();
    this.photo = {};
  }

  updated() {
    const wrapper = this.shadowRoot.querySelector('#wrapper');
    
    if (!wrapper) {return;}
    const lowres = new Image();
    lowres.src = this.photo.image05;
    wrapper.style.backgroundImage = (
      "url('" + this.photo.image + "')," +
      "url('" + this.photo.image05 + "')");
  }

  openPhotoPage() {
    console.log('zoom!');
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
    :host {
      display: block;
      width: 100%;
    }
    #wrapper {
      width: 100%;
      height: 0;
      background: #eee;
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 8px;
      position: relative;
    }

    .credit {
      background: rgba(255, 255, 255, .65);
      padding: 2px 8px;
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
    .credit:hover {
      background: white;
    }
    `];
  }

  render() {
    if (!this.photo.image) {
      return nothing;
    }
    
    return html`
      ${this.photo.caption ? html`
        <h3>${this.photo.caption}</h3> `
        : nothing
       }

      <div id="wrapper"
           style="padding-bottom: ${this.photo.cssHeight};"
           @click=${this.openPhotoPage}
	   >
        ${this.photo.credit ? html`
          <span class="credit unimportant">
            Credit: <a href="${this.photo.creditUrl}">${this.photo.credit}</a>
          </span> `
        : nothing}
      </div>

    `;
  }
}

customElements.define('pq-photo-block', PQPhotoBlock);
