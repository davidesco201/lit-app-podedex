import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Pokemon } from "../model/pokemon.model.js";
import { capitalize } from "../utils/capitalize.js";


import "./loader.js";
import getColorByType from "../model/color-types.dir.js";
import { Router } from "@vaadin/router";

@customElement("poke-card")
export class PokeCard extends LitElement {
  @property({ type: Object })
  pokemon?: Pokemon;

  @property({ type: Boolean, reflect: true })
  edit = false;

  static styles = css`
    div.card {
      display: flex;
      flex-direction: row;
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
    div.card.edit:hover {
      cursor: default;
      box-shadow: var(--shadow-2);
    }

    .pokemon .name {
      font-size: 1.2em;
      font-weight: bold;
      margin-top: 0.5rem;
    }

    div.card.pokemon {
      justify-content: space-evenly;
      align-items: center;
      border: 1px solid var(--type-color, var(--main-color));
      background-color: var(--type-color, var(--light-shades-color));
      text-align: left;
      width: fit-content;
      margin: auto;
      min-width: 15rem;
    }
    .pokemon.card h1 {
      color: var(--light-shades-color);
      margin: 0;
    }

    .pokemon .type {
      border: 1px solid rgba(255, 255, 255, 0.2);;
      border-radius: 0.5rem;
      padding: 0.5rem;
      text-align: center;
      width: fit-content;
      color: var(--light-shades-color);
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .pokemon img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
      aspect-ratio: 1/1;
      filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    }

    .pokemon.card custom-button button {
      background-color: white;
    }

    .col {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 1rem;
      justify-content: flex-start;
    }
    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: flex-start;
    }
  `;

  handleOnClick() {
    this.dispatchEvent(
      new CustomEvent("open-page", {
        detail: this.pokemon,
      })
    );
  }

  openPage(event: CustomEvent) {
    const { data } = event.detail;
    if (data) {
      history.pushState(data, "", `/pokemon/${data.name}/edit`);
      window.dispatchEvent(new PopStateEvent("popstate", { state: data }));
      Router.go(`/pokemon/${data.name}/edit`);
    }
  }

  renderPokeCard(pokemon: Pokemon, edit: boolean) {
    if (edit) {
      return html`
        <div
          class="card pokemon"
          style="--type-color: ${getColorByType(pokemon?.type[0])};"
          @click=${this.handleOnClick}
        >
          <div class="col">
            <h1 class="name">${capitalize(pokemon?.name)}</h1>
            <div class="col">${this.renderPokemonTypes(pokemon)}</div>
            <custom-button
              .data=${pokemon}
              text="Edit"
              @custom-event=${this.openPage}
              .subtle=${true}
            ></custom-button>
          </div>
          <img
                src="../../assets/pokemon/${pokemon?.image || ""}"
                alt="${pokemon?.name}"
              />
        </div>
      `;
    } else {
      return html`
        <div
          class="card pokemon"
          style="--type-color: ${getColorByType(pokemon?.type[0])};"
          @click=${this.handleOnClick}
        >
          <div class="col">
            <h1 class="name">${capitalize(pokemon?.name)}</h1>
            <div class="col">${this.renderPokemonTypes(pokemon)}</div>
          </div>
          <img
                src="../../assets/pokemon/${pokemon?.image || ""}"
                alt="${pokemon?.name}"
              />
        </div>
      `;
    }
  }

  renderPokemonTypes(pokemon: Pokemon) {
    return pokemon?.type.map(
      (type) => html`
        <span class="type" style="--type-color-span: ${getColorByType(type)};">
          ${type}
        </span>
      `
    );
  }
  render() {
    return html`
      ${this.pokemon
        ? html`
           ${this.renderPokeCard(this.pokemon, this.edit)}
          `
        : html`<poke-loader></poke-loader>`}
    `;
  }
}
