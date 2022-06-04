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
       div {
         max-width: 320px;
         margin: 16px;
         padding: 8px 16px;
         border-radius: 32px;
       }

       p {
        margin: 0;
       }

       #problem {
         background: var(--sl-color-pink-200);
         padding: 40px;
         border-radius: 45%
       }

       #solution {
         background: var(--sl-color-lime-100);
       }

       #action {
         background: var(--sl-color-primary-600);
         color: white;
         transform: skew(-5deg);
         border-radius: 4px; 
       }
    `];
  }

  render() {
    return html`
      <div id="problem">
        <p>Kids love going to theme parks.</p>
        <p>But, when lines get long, they are not happy campers.</p>
      </div>

      <div id="solution">
        <p>ParkQueues.com helps make waits <i>seem shorter</i> by providing:</p>
        <ul>
          <li>Estimates of the time remaining for points in the queue</li>
          <li>Trivia, jokes, riddles, puzzles, and quests</li>
        </ul>
      </div>

      <div id="action">
        <p>Unlike most theme park apps and sites, Park Queues has data
           for many parks.  Just choose from the main menu.</p>
     </div>
    `;
  }
}

customElements.define('pq-splash', PQSplash);


