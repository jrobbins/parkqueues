import {css} from 'lit';

export const SHARED_STYLES = [
    css`
      * { 
        font-family: "Poppins", sans-serif;
      }

      * {
        font-weight: 300;
      }

      sl-details::part(base) {
        border: 0;
        background: transparent;
      }

      sl-details::part(header) {
        padding: 16px 4px 4px 4px;
        font-size: larger;
      }

      sl-details::part(content) {
        padding: 4px;
      }

      .comma-sep::after {
        content: ", ";
      }

      .comma-sep:last-of-type::after {
        content: "";
      }

     .unimportant a[href],
     .unimportant a:visited,
     a.unimportant[href],
     a.unimportant:visited {
       color: rgba(82, 110, 156, .80);
       text-decoration: none;
     }
     .unimportant  {
       color: hsla(0, 0%, 0%, .47);
     }


    `
];
