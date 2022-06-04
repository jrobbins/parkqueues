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
         width: 65vw;
         min-height: 15vw;
         margin: 3vh auto;
         padding: 8px 16px;
         border-radius: 32px;
         text-align: center;
         display: flex;
         justify-content: center;
         align-content: center;
         flex-direction: column;
       }

       p, ul {
         margin: 0;
         font-size: 4vw;
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
         transform: skew(-15deg);
         border-radius: 4px; 
       }
    `];
  }

  render() {
    return html`
      <div id="problem">
        <p>Kids love going to theme parks.</p>
        <p>But, when lines get long, they are not&nbsp;happy&nbsp;campers.</p>
      </div>

      <div id="solution">
        <p>ParkQueues helps make waits <i>seem&nbsp;shorter</i> by providing:
        <p>estimates of the time remaining for points in the queue,</p>
        <p>trivia, jokes, riddles, puzzles, and&nbsp;quests.</p>
      </div>

      <div id="action">
        <p>Unlike most theme park apps and sites, ParkQueues has data
           for many parks.  Just choose from the main&nbsp;menu.</p>
     </div>
    `;
  }
}

customElements.define('pq-splash', PQSplash);


