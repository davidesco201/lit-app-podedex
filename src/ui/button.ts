import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("custom-button")
export class Button extends LitElement {
  @property({ type: Object, reflect: true }) data: any;
  @property({ type: String, reflect: true }) text!: string;
  @property({ type: Boolean, reflect: true }) subtle = false;

  static styles = [
    css`
      button {
        border: 1px solid var(--btn-border, var(--main-color));
        border-radius: 0.5rem;
        padding: 1rem;
        text-align: center;
        width: 100%;
        font-family: var(--main-font);
        cursor: pointer;
        background-color: var(--btn-bg, var(--main-color));
        color: var(--light-shades-color);
        font-size: large;
        max-width: var(--btn-size, 5rem);
        min-width: var(--btn-size, 5rem);
      }
    `,
  ];
  _handleClick() {
    const event = new CustomEvent("custom-event", {
      detail: {
        data: this.data,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`<button
      style="
        --btn-bg: ${this.subtle ? "transparent" : "var(--main-color)"}; 
        --btn-border: ${this.subtle ? "var(--light-shades-color)" : "var(--main-color)"};
        --btn-size: ${this.subtle ? "5rem" : "auto"};
        "
      @click=${this._handleClick}
    >
      ${this.text}
    </button>`;
  }
}
