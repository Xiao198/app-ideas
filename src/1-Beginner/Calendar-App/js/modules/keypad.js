export function setupKeypad(calculator, display) {
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(
    ".btn-orange, .btnContainer .btnRow:first-child .btn-gray:nth-child(3)"
  );
  const acButton = document.querySelector(
    ".btnContainer .btn-gray:first-child"
  );
  const clearButton = document.querySelector(
    ".btnContainer .btnRow:first-child .btn-orange"
  );
  const signButton = document.querySelector(
    ".btnContainer .btnRow:first-child .btn-gray:nth-child(2)"
  );

  // 数字按钮处理
  numbers.forEach((button) => {
    button.addEventListener("click", () => {
      try {
        const value = calculator.inputDigit(button.textContent);
        display.update(value);
      } catch (error) {
        display.showError();
      }
    });
  });

  // 运算符按钮处理
  operators.forEach((button) => {
    button.addEventListener("click", () => {
      try {
        const value = calculator.inputOperator(button.textContent);
        display.update(value);
      } catch (error) {
        display.showError();
      }
    });
  });

  // AC按钮处理
  acButton.addEventListener("click", () => {
    const value = calculator.clearAll();
    display.update(value);
  });

  // C按钮处理
  clearButton.addEventListener("click", () => {
    const value = calculator.clear();
    display.update(value);
  });

  // +/-按钮处理
  signButton.addEventListener("click", () => {
    try {
      const value = calculator.toggleSign();
      display.update(value);
    } catch (error) {
      display.showError();
    }
  });
}

export function setupKeyboardInput(calculator, display) {
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    // 数字键和小数点
    if (/[0-9.]/.test(key)) {
      try {
        const value = calculator.inputDigit(key);
        display.update(value);
      } catch (error) {
        display.showError();
      }
    }

    // 运算符
    const operatorMap = {
      "+": "+",
      "-": "-",
      "*": "×",
      "/": "÷",
      Enter: "=",
      "=": "=",
    };

    if (key in operatorMap) {
      try {
        const value = calculator.inputOperator(operatorMap[key]);
        display.update(value);
      } catch (error) {
        display.showError();
      }
    }

    // Escape键 - AC
    if (key === "Escape") {
      const value = calculator.clearAll();
      display.update(value);
    }

    // Backspace键 - C
    if (key === "Backspace") {
      const value = calculator.clear();
      display.update(value);
    }
  });
}
