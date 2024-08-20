import { LitElement, html, css } from "lit";
import getColorByType, { capitalizedTypes } from "../model/color-types.dir";
import { Router } from "@vaadin/router";

export class PokeEdit extends LitElement {
  static properties = {
    pokemon: { type: Object },
    hasChange: { type: Boolean },
    modalOpen: { type: Boolean },
    isDuplicate: { type: Boolean },
  };

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      font-family: var(--main-font);
    }

    .editor h1 {
      color: var(--type-color, var(--dark-shades-color));
      margin: 0.5rem;
    }

    .editor img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
      aspect-ratio: 1 / 1;
    }

    .editor input,
    .editor select {
      margin-bottom: 16px;
      padding: 8px;
      border: 1px solid var(--grey-color);
      border-radius: 0.5rem;
    }

    .editor label {
      color: var(--dark-shades-color);
      margin: 0.5rem 0;
      font-weight: bold;
    }

    .save-button {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    .save-button.active {
      opacity: 1;
      pointer-events: auto;
      cursor: pointer;
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
    this.pokemon = {};
    this.hasChange = false;
    this.modalOpen = false;
    this.isDuplicate = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.pokemon = history.state || {};
  }

  async firstUpdated() {
    this.shadowRoot.querySelector("#type").value =
      this.pokemon?.type?.[0] || "";
  }

  handleNameChange(event) {
    this.pokemon = { ...this.pokemon, name: event.target.value };
    this.hasChange = true;
  }

  handleTypeChange(event) {
    this.pokemon = { ...this.pokemon, type: [event.target.value] };
    this.hasChange = true;
  }

  handleImageChange(event) {
    this.pokemon = { ...this.pokemon, image: event.target.value };
    this.hasChange = true;
  }

  handleDuplicateChange(event) {
    this.isDuplicate = event.target.checked;
    if (this.isDuplicate) {
      this.modalOpen = true;
    }
  }

  saveChanges(event) {
    const updatedPokemon = event.detail.data;
    console.log(updatedPokemon);
    this.hasChange = false;
  }

  openModal(event) {
    if (event.detail) {
      this.modalOpen = true;
    }
  }

  handleCloseModal(event) {
    this.modalOpen = event.detail;
  }

  goBack() {
    Router.go("/");
  }

  render() {
    return html`
      <div
        class="editor"
        style="--type-color: ${getColorByType(this.pokemon?.type?.[0] || "")}"
      >
        <h1>Edit Pokémon</h1>
        <img
          src="../../assets/pokemon/${this.pokemon?.image || ""}"
          alt="${this.pokemon?.name || ""}"
        />
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          .value="${this.pokemon?.name || ""}"
          @input="${this.handleNameChange}"
        />
        <label for="type">Type:</label>
        <select
          id="type"
          @change="${this.handleTypeChange}"
          .value="${this.pokemon?.type?.[0] || ""}"
        >
          <option value="" disabled>Select a type</option>
          ${this.renderTypeOptions()}
        </select>
        <label for="image">Image URL:</label>
        <input
          id="image"
          type="text"
          .value="${this.pokemon?.image || ""}"
          @input="${this.handleImageChange}"
        />
        <label for="duplicate">Is this Pokémon a duplicate?</label>
        <input
          id="duplicate"
          type="checkbox"
          @change="${this.handleDuplicateChange}"
        />
        <custom-button
          class="save-button ${this.hasChange ? "active" : ""}"
          .data="${this.pokemon}"
          text="Save"
          ?disabled="${!this.hasChange}"
          @custom-event="${this.saveChanges}"
        ></custom-button>
      </div>
      <button @click="${this.goBack}">
        <img src="../../assets/chevron_left.svg" alt="Previous Button" />
      </button>
      <poke-modal
        @close-modal="${this.handleCloseModal}"
        .open="${this.modalOpen}"
        content="You have marked this Pokémon as a duplicate. You can change it at the nearest point."
      ></poke-modal>
    `;
  }

  renderTypeOptions() {
    return capitalizedTypes.map(
      (type) => html`<option value="${type}">${type}</option>`
    );
  }
}
customElements.define("poke-edit", PokeEdit);
