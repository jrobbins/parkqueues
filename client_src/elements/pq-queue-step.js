import {LitElement, css, html, nothing} from 'lit';
import {SHARED_STYLES} from '../shared-css.js';
import './pq-photo-block.js';

class PQQueueStep extends LitElement {
  static get properties() {
    return {
      step: {type: Object},
    };
  }

  constructor() {
    super();
    this.step = null;
  }

  toggleAnswer(event) {
      event.preventDefault();
      event.target.style.display = "none";
      event.target.nextElementSibling.style.display = "block";
  }

  static get styles() {
    return [
      ...SHARED_STYLES,
      css`
    :host {
      display: block;
      width: 100%;
    }
    dt {
      padding-top: 16px;
      margin-top: 32px;
    }
    dt a {
      display: block;
    }
    dd {
      display: none;
    }
    .ispy {
      background: #ffd;
      padding-left: 8px;
      padding-right: 8px;
    }

    `];
  }

  renderRemaining() {
    if (!this.step.remaining) {
      return nothing;
    }

    const fudgeFactor = 0;
    const minutes = Math.floor(this.step.remaining * (1 + fudgeFactor / 100.0));

    return html`
      <h3>${minutes} Minutes Remain When You See</h3>
    `;    
  }
  
  renderTrivia() {
    if (!this.step.trivia.length) {
      return nothing;
    }
    
    return html`
      <dl>
        ${this.step.trivia.map((qa) => html`
          <dt>${qa.q}</dt>
          ${qa.a ? html`
            <a href="" @click=${this.toggleAnswer}>Show answer</a>
            <dd>${qa.a}</dd>
	    ` : nothing }
          `)}
      </dl>
    `;
  }

  render() {
    if (!this.step) {
      return nothing;
    }
    
    return html`
     <div class=${this.step.cls}>
       ${this.renderRemaining()}

       <pq-photo-block .photo=${this.step.photo}></pq-photo-block>

       ${this.renderTrivia()}
     </div>
    `;
  }
}

customElements.define('pq-queue-step', PQQueueStep);
