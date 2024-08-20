import { LitElement, html, css } from "lit";
import { router } from "./router/router.js";
import { PokeHeader } from "./ui/header.ts";
import { PokeHome } from "./pages/home.js";
import { EvolutionPage } from "./pages/evolutions.js";
import { PokeEdit } from "./pages/edit.js";

export class PokeDex extends LitElement {
  static styles = css`
    .col {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 0.5rem;
      justify-content: flex-start;
    }
  `;

  render() {
    return html`
      <div class="pokedex col">
        <poke-header></poke-header>
        <main id="outlet"></main>
      </div>
    `;
  }

  firstUpdated() {
    router.setOutlet(this.shadowRoot.querySelector("#outlet"));
  }
}
customElements.define("poke-dex", PokeDex);
