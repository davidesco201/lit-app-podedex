import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { capitalize } from "../utils/capitalize.js";

import "./loader.js";

@customElement("poke-modal")
export class PokeModal extends LitElement {
  @property({ type: String })
  content?: string;

  @property({ type: Boolean, reflect: true })
  open = false;

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 1;
    }
    :host([open]) {
      display: flex;
    }
    .modal {
      background-color: var(--light-shades-color, white);
      border-radius: 2rem;
      padding: 0.5rem;
      min-width: 20%;
      width: fit-content;
      text-align: center;
      font-family: var(--main-font);
      border: 4px solid var(--main-color);
      border-color: var(--main-color);
    }
    .header {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      white-space: nowrap;
      gap: 0.5rem;
      justify-content: space-between;
      padding: 0.5rem;
      color: var(--type-color, var(--main-color));
    }
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: flex-start;
      padding: 0.5rem;
    }

    button.close-button > img {
      filter: brightness(0) invert(1);
    }

    button.close-button {
      background-color: var(--main-color);
      color: var(--light-shades-color);
      border-radius: 50%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      box-shadow: var(--shadow-1);
      border: 1px solid var(--main-color);
      font-size: 1.2rem;
      min-width: 10mm;
      min-height: 10mm;
    }

    button.close-button:hover {
      cursor: pointer;
      box-shadow: var(--shadow-2);
    }
    p {
      margin: 0;
    }
  `;

  handleOnClose() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("close-modal", {
        detail: false,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="modal">
        <div class="header">
          <div class="name">${capitalize("Info")}</div>
          <button class="close-button" @click=${this.handleOnClose}>
            <img src="./../../assets/close.svg" att="Close Button" />
          </button>
        </div>
        <div class="content">
          <p>${this.content}</p>
        </div>
      </div>
    `;
  }
}
