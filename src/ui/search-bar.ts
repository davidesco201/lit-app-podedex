import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("search-bar")
export class SearchBar extends LitElement {
  @property({ type: String }) placeholder = "Search...";
  @state() currentValue = "";
  @state() isLoading = false;

  static styles = css`
    
    div.search-bar {
      height: fit-content;
      display: flex;
      align-items: center;
    }
    .search-input {
      background-color: var(--light-shades-color);
      border: 1px solid var(--main-color); 
      border-radius: 1rem;
      color: var(--dark-shades-color);
      min-width: 10mm;
      min-height: 10mm;
      padding: 0.5rem;
      text-align: start;
      width: 100%;
      margin-right: 0.5rem;
      font-family: var(--main-font);
      font-size: 1.2rem;
      color: var(--main-color);
      box-shadow: var(--shadow-1);
    }
    .search-input::placeholder {
      color: var(--main-color);
    }
    .search-input:focus-visible {
      outline: none;
    }
    .button {
      background-color: var(--main-color);
      border: 1px solid var(--main-color);
      border-radius: 50%;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      box-shadow: var(--shadow-1);
    }
    .button {
      font-size: 1.2rem;
      min-width: 10mm;
      min-height: 10mm;
    }

    .button > img {
      filter: brightness(0) invert(1);;
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
  `;

  handleInputChange(event: any) {
    this.currentValue = event.target.value;
    this.handleSearch();
  }

  handleSearch() {
    this.dispatchEvent(
      new CustomEvent("searched", {
        detail: this.currentValue,
      })
    );
  }

  handleClear() {
    this.currentValue = "";
    this.handleSearch();
  }

  render() {
    return html`
      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          .placeholder=${this.placeholder}
          .value=${this.currentValue}
          @input=${this.handleInputChange}
        />
        <div class="row oneline">
          <button class="button" @click=${this.handleSearch}>
            <img src="./../../assets/search.svg" alt="Search Button">
          </button>
          <button class="button" @click=${this.handleClear}>
            <img src="./../../assets/close.svg" alt="Close Button">
          </button>
        </div>
      </div>
    `;
  }
}
