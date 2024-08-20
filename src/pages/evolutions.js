import { LitElement, html, css } from "lit";
import PokeDataManager from "../data/pokemon.dm.ts";
import PokemonPresenter from "../dp/pokemon.dp.ts";
import { Router } from "@vaadin/router";
import getColorByType from "../model/color-types.dir";
import "../ui/loader.ts";
import "../ui/button.ts";

export class EvolutionPage extends LitElement {
  static properties = {
    loading: { type: Boolean },
    pokemon: { type: Object },
  };

  static styles = css`
    .margin {
      margin: 0.5rem;
    }

    .gap2 {
      gap: 2rem;
    }
    .pokemon {
      justify-content: space-evenly;
      align-items: center;
      border: 1px solid var(--type-color, var(--main-color));
      border-radius: 1rem;
      padding: 1rem;
      text-align: center;
      width: fit-content;
      margin: auto;
      font-family: var(--main-font);
      box-shadow: var(--shadow-1);
      cursor: pointer;
    }
    .pokemon h1 {
      color: var(--type-color, var(--main-color));
      margin: 0;
    }

    .pokemon .type {
      border: 1px solid var(--type-color-span, var(--main-color));
      border-radius: 0.5rem;
      padding: 0.5rem;
      text-align: center;
      width: fit-content;
      color: var(--type-color-span, var(--main-color));
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
    .pokemon img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
      aspect-ratio: 1/1;
    }
    .back-btn {
      margin-top: 0.5rem;
      padding: 0.5rem;
    }

    button {
      background-color: var(--main-color);
      color: var(--light-shades-color);
      border-radius: 50%;
      cursor: pointer;
      padding: 0.5rem;
      border: 1px solid var(--main-color);
      font-size: 1.2rem;
      min-height: 10mm;
      min-width: 10mm;
      display: flex;
      align-items: center;
      box-shadow: var(--shadow-1);
      margin: 0.5rem;
    }

    button > img {
      filter: brightness(0) invert(1);
    }

    button:hover {
      box-shadow: var(--shadow-1);
    }
  `;

  constructor() {
    super();
    this.dataManager = new PokeDataManager("http://localhost:3002/pokemon", 4);
    this.presenter = new PokemonPresenter(
      this.dataManager,
      this.openPage.bind(this)
    );
    this.loading = false;
    this.pokemon = undefined;
  }

  async firstUpdated() {
    const { name } = this.location.params;
    this.loading = true;
    try {
      this.pokemon = await this.presenter.loadEvolutions(name);
    } catch (error) {
      console.error("Error loading evolutions:", error);
    } finally {
      this.loading = false;
    }
  }

  openPage(event) {
    const { data } = event.detail;
    if (data) {
      console.log(data);
      history.pushState(data, "", `/pokemon/${data.name}/edit`);
      window.dispatchEvent(new PopStateEvent("popstate", { state: data }));
      Router.go(`/pokemon/${data.name}/edit`);
    }
  }

  goBack() {
    Router.go(`/`);
  }

  render() {
    return html`
      ${this.loading
        ? html`<poke-loader></poke-loader>`
        : this.pokemon
        ? html` <div class="col margin gap2">
              <poke-container>
                ${this.renderPokemonDetails(this.pokemon)}
                ${this.pokemon.evolutions.map(
                  (pokemon) => html`${this.renderPokemonDetails(pokemon)}`
                )}
              </poke-container>
            </div>
            <button @click=${this.goBack}>
              <img src="../../assets/chevron_left.svg" alt="Previous Button" />
            </button>`
        : html`<poke-loader></poke-loader>`}
    `;
  }

  renderPokemonDetails(pokemon) {
    return html`
      <div
        class="col pokemon"
        style="--type-color: ${getColorByType(pokemon?.type[0])};"
      >
        <img
          src="../../assets/pokemon/${pokemon?.image || ""}"
          alt="${pokemon?.name}"
        />
        <div class="row">
          <div class="col">
            <h1>${pokemon?.name}</h1>
            <div class="row">${this.renderPokemonTypes(pokemon)}</div>
            <custom-button
              .data=${pokemon}
              text="Edit"
              @custom-event=${this.openPage}
            ></custom-button>
          </div>
        </div>
      </div>
    `;
  }

  renderPokemonTypes(pokemon) {
    return pokemon?.type.map(
      (type) => html`
        <span class="type" style="--type-color-span: ${getColorByType(type)};">
          ${type}
        </span>
      `
    );
  }
}

customElements.define("evolution-page", EvolutionPage);
