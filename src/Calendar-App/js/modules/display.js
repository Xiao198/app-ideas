import { formatDisplay } from "../utils/formatter.js";
import { addShakeAnimation } from "../utils/animations.js";

export class Display {
  constructor(element) {
    this.element = element;
  }

  update(value) {
    this.element.textContent = formatDisplay(value);
  }

  showError(message = "ERR") {
    this.element.textContent = message;
    this.element.classList.add("error");
    addShakeAnimation(this.element);

    setTimeout(() => {
      this.element.classList.remove("error");
    }, 1000);
  }
}
