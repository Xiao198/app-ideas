import { Calculator } from "./Calculator.js";
import { Display } from "./modules/display.js";
import { setupKeypad, setupKeyboardInput } from "./modules/keypad.js";
import { addButtonFeedback } from "./utils/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  // 初始化计算器和显示
  const calculator = new Calculator();
  const display = new Display(document.querySelector(".screen"));

  // 设置按键处理
  setupKeypad(calculator, display);
  setupKeyboardInput(calculator, display);

  // 添加按钮反馈效果
  document.querySelectorAll(".btn-gray").forEach(addButtonFeedback);

  // 显示初始值
  display.update("0");
});
