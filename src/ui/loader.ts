import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("poke-loader")
export class PokeLoader extends LitElement {
  static styles = [
    css`
      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid var(--main-color);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  render() {
    return html`<span class="loader"></span>`;
  }
}
