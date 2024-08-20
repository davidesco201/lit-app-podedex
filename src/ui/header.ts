import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('poke-header')
export class PokeHeader extends LitElement {
  static styles = css`
    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: flex-start;
    }
    header {
      background-color: var(--main-color);
      min-height: 5rem;
      align-items: center;
      padding: 0.5rem;
    }
    header > h1 {
      color: var(--light-shades-color);
    }
    header > img {
      width: 3rem;
      height: 3rem;
      justify-self: center;
    }
  `;

  render() {
    return html`
      <header class="row">
        <img src="../../assets/361998.png" alt="Pokeball" />
        <h1>Pokedex</h1>
      </header>
    `;
  }
}
