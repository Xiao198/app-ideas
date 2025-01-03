export class Calculator {
  constructor() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.maxDigits = 8;
    this.lastResult = null;
    this.lastOperator = null;
  }

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit === "." ? "0." : digit;
      this.waitingForSecondOperand = false;
    } else {
      if (digit === "." && !this.displayValue.includes(".")) {
        this.displayValue += digit;
      } else if (digit !== ".") {
        const numDigits = this.displayValue.replace(".", "").length;
        if (numDigits < this.maxDigits) {
          this.displayValue =
            this.displayValue === "0" ? digit : this.displayValue + digit;
        }
      }
    }
    return this.displayValue;
  }

  inputOperator(nextOperator) {
    if (nextOperator === "=") {
      if (
        this.operator &&
        this.firstOperand !== null &&
        !this.waitingForSecondOperand
      ) {
        const result = this.calculate();
        this.lastResult = this.displayValue;
        this.lastOperator = this.operator;
        this.displayValue = String(result);
        this.firstOperand = null;
        this.operator = null;
      } else if (this.lastResult && this.lastOperator) {
        const result = this.calculate(
          this.displayValue,
          this.lastResult,
          this.lastOperator
        );
        this.displayValue = String(result);
      }
    } else {
      if (!this.waitingForSecondOperand) {
        if (this.operator && this.firstOperand !== null) {
          const result = this.calculate();
          this.displayValue = String(result);
        }
        this.firstOperand = parseFloat(this.displayValue);
        this.operator = nextOperator;
        this.waitingForSecondOperand = true;
      } else {
        this.operator = nextOperator;
      }
    }
    return this.displayValue;
  }

  calculate(
    first = this.firstOperand,
    second = parseFloat(this.displayValue),
    op = this.operator
  ) {
    let result;

    switch (op) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "×":
        result = first * second;
        break;
      case "÷":
        if (second === 0) throw new Error("除数不能为零");
        result = first / second;
        break;
      default:
        return second;
    }

    if (!isFinite(result)) throw new Error("计算结果无效");

    const resultStr = String(result);
    const [integer, decimal] = resultStr.split(".");

    if (integer.length > this.maxDigits) throw new Error("结果超出显示范围");

    if (decimal) {
      const maxDecimalPlaces = this.maxDigits - integer.length - 1;
      return Number(result).toFixed(Math.min(3, maxDecimalPlaces));
    }

    return String(result);
  }

  clear() {
    if (this.waitingForSecondOperand) {
      this.displayValue = String(this.firstOperand);
      this.waitingForSecondOperand = false;
    } else if (this.displayValue !== "0") {
      this.displayValue = "0";
    } else if (this.operator) {
      this.operator = null;
      this.displayValue = String(this.firstOperand);
    }
    return this.displayValue;
  }

  clearAll() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.lastResult = null;
    this.lastOperator = null;
    return this.displayValue;
  }

  toggleSign() {
    this.displayValue = String(-parseFloat(this.displayValue));
    return this.displayValue;
  }
}
