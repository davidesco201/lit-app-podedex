import { LitElement, html, css, CSSResultGroup } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("poke-container")
export class PokeContainer extends LitElement {
  static styles = css`
    div.grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      gap: 1vw;
      row-gap: 2rem;
    }
  `;

  render() {
    return html`
      <div class="grid">
        <slot></slot>
      </div>
    `;
  }
}
