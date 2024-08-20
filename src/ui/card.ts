import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Pokemon } from "../model/pokemon.model.js";
import { capitalize } from "../utils/capitalize.js";

import "./loader.js"

@customElement("poke-card")
export class PokeCard extends LitElement {
  @property({ type: Object })
  pokemon?: Pokemon ;

  static styles = css`
    div.card {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 0.5rem;
      justify-content: space-evenly;
      border: 1px solid var(--main-color);
      border-radius: 1rem;
      padding: 1rem;
      text-align: center;
      max-width: 8rem;
      min-height: 70%;
      margin: auto;
      font-family: var(--main-font);
      box-shadow: var(--shadow-1);
    }

    div.card:hover {
      cursor: pointer;
      box-shadow: var(--shadow-2);
    }

    img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
      aspect-ratio: 1/1;
    }
    .name {
      font-size: 1.2em;
      font-weight: bold;
      margin-top: 0.5rem;
    }
  `;

  handleOnClick(){
    this.dispatchEvent(
      new CustomEvent('open-page', {
        detail: this.pokemon, 
      })
    )
  }

  render() {
    return html`
      ${this.pokemon
        ? html`
            <div class="card" @click=${this.handleOnClick}>
              <img
                src="../../assets/pokemon/${this.pokemon?.image}"
                alt="${this.pokemon?.name}"
              />
              <p class="name">${capitalize(this.pokemon?.name)}</p>
            </div>
          `
        : html`<poke-loader></poke-loader>`}
    `;
  }
}
