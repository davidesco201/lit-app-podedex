import { LitElement, html, css } from "lit";
import PokemonListPresenter from "../dp/pokemon-list.dp.ts";
import PokeDataManager from "../data/pokemon.dm.ts";
import { Router } from "@vaadin/router";
import "../ui/container.ts";
import "../ui/card.ts";
import "../ui/search-bar.ts";
import "../ui/modal.ts";
import "../ui/loader.ts";

export class PokeHome extends LitElement {
  static properties = {
    loading: { type: Boolean },
    filteredPokemons: { type: Array },
    currentPage: { type: Number },
  };

  static styles = css`
    .col {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: flex-start;
    }

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: flex-start;
    }

    .row.oneline {
      flex-wrap: nowrap;
      white-space: nowrap;
    }

    .margin {
      margin: 0.5rem;
    }

    .gap2 {
      gap: 2rem;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      margin: 2rem;
    }

    .pagination > button {
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
    }

    .pagination > button > img {
      filter: brightness(0) invert(1);
    }

    .pagination > button:hover {
      box-shadow: var(--shadow-1);
    }

    .pagination > button:disabled {
      background-color: var(--light-shades-color);
      border: 1px solid var(--grey-color);
      cursor: not-allowed;
      box-shadow: none;
    }

    .pagination > button:disabled > img {
      filter: none;
    }
  `;

  constructor() {
    super();
    this.dataManager = new PokeDataManager("http://localhost:3002/pokemon", 13);
    this.presenter = new PokemonListPresenter(
      this.dataManager,
      this.updatePokemons.bind(this),
      this.updatePage.bind(this),
      this.openPage.bind(this)
    );
    this.loading = false;
    this.filteredPokemons = [];
    this.currentPage = 0;
  }

  async firstUpdated() {
    this.loading = true;
    try {
      await this.presenter.loadPokemons();
    } catch (error) {
      console.error("Error loading pokemons:", error);
    } finally {
      this.loading = false;
    }
  }

  updatePokemons(pokemons) {
    this.filteredPokemons = pokemons;
  }

  updatePage(page) {
    this.currentPage = page;
  }

  handleSearchResult(event) {
    const searchTerm = event.detail;
    this.presenter.filterPokemons(searchTerm);
  }

  handleNext() {
    this.presenter.nextPage();
  }

  handlePrevious() {
    this.presenter.previousPage();
  }

  openPage(pokemon) {
    Router.go(`/pokemon/evolutions/${pokemon}`);
  }

  render() {
    return html`
      ${this.loading
        ? html`<poke-loader></poke-loader>`
        : html`
            <div class="col margin gap2">
              <search-bar @searched=${this.handleSearchResult}></search-bar>
              <poke-container>
                ${this.filteredPokemons.map(
                  (pokemon) => html`
                    <poke-card
                      @open-page=${() =>
                        this.presenter.handleCardClick(pokemon?.name)}
                      .pokemon="${pokemon}"
                    ></poke-card>
                  `
                )}
              </poke-container>
            </div>
          `}
    `;
  }
}
customElements.define("poke-home", PokeHome);
