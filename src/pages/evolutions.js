import { LitElement, html, css } from "lit";
import PokeDataManager from "../data/pokemon.dm.ts";
import PokemonPresenter from "../dp/pokemon.dp.ts";
import { Router } from "@vaadin/router";
import { parseEvolutionToPokemon } from "../model/pokemon.model.ts"
import "../ui/loader.ts";
import "../ui/button.ts";
import "../ui/card.ts"

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
                <poke-card .pokemon=${this.pokemon} .edit=${true}></poke-card>
                ${this.pokemon.evolutions.map(
                  (pokemon) => html`<poke-card .pokemon=${parseEvolutionToPokemon(pokemon)} .edit=${true}></poke-card>`
                )}
              </poke-container>
            </div>
            <button @click=${this.goBack}>
              <img src="../../assets/chevron_left.svg" alt="Previous Button" />
            </button>`
        : html`<poke-loader></poke-loader>`}
    `;
  }
}

customElements.define("evolution-page", EvolutionPage);
