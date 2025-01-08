let timer;

const circleLights = document.querySelectorAll(".circle");
const startButton = document.getElementById("start-button");
const intervalInput = document.getElementById("interval-input");
const intensityInput = document.getElementById("intensity-input");
const sizeInput = document.querySelectorAll(".size-input");
const rowsInput = document.getElementById("rows-input");
const lightRow = document.querySelector(".light-row");
const lightContainer = document.querySelector(".light-container");
const colorInputs = document.querySelectorAll(".color-input");
let interval = intervalInput.value;
let intensity = intensityInput.value;
let rows = rowsInput.value;
const sizeArray = [];

sizeInput.forEach((size) => {
  sizeArray.push(size.value);
});

// 添加颜色映射对象
const colorMap = {
  red: "#c0392b",
  yellow: "#f1c40f",
  blue: "#64fcfe",
  green: "#2ecc71",
};

// 添加默认值常量
const DEFAULT_INTERVAL = 1000;
const DEFAULT_INTENSITY = 10;
const DEFAULT_SIZE = 50;
const MIN_SIZE = 20; // 最小灯泡尺寸
const MAX_SIZE = 100; // 最大灯泡尺寸

// Initial light
const initialLight = () => {
  const allLights = document.querySelectorAll(".circle");
  allLights.forEach((circle, index) => {
    if (index % 2 === 0) {
      const colorClass = Array.from(circle.classList).find(
        (cls) => colorMap[cls]
      );
      const shadowColor = colorMap[colorClass];
      circle.style.boxShadow = `0 0 ${intensity}px ${shadowColor}`;
    }
  });
};
// Stop light
const stopLight = () => {
  const allLights = document.querySelectorAll(".circle");
  allLights.forEach((circle) => {
    circle.style.boxShadow = "";
  });
};

// Start and Stop button
startButton.addEventListener("click", () => {
  // Start button
  if (startButton.textContent === "Start") {
    startButton.textContent = "Stop";
    initialLight();
    timer = setInterval(() => {
      // 每次循环重新获取所有灯泡
      const allLights = document.querySelectorAll(".circle");
      allLights.forEach((circle, index) => {
        if (circle.style.boxShadow === "") {
          // 获取灯泡的颜色类名
          const colorClass = Array.from(circle.classList).find(
            (cls) => colorMap[cls]
          );
          const shadowColor = colorMap[colorClass];
          circle.style.boxShadow = `0 0 ${intensity}px ${shadowColor}`;
        } else {
          circle.style.boxShadow = "";
        }
      });
    }, interval);
  } else {
    // Stop button
    startButton.textContent = "Start";
    clearInterval(timer);
    stopLight();
  }
});

// Interval input
intervalInput.addEventListener("input", () => {
  const value = parseInt(intervalInput.value);
  if (value < 0 || isNaN(value)) {
    intervalInput.value = DEFAULT_INTERVAL;
    interval = DEFAULT_INTERVAL;
  } else {
    interval = value;
  }
});

// Intensity input
intensityInput.addEventListener("input", () => {
  const value = parseInt(intensityInput.value);
  if (value < 0 || isNaN(value)) {
    intensityInput.value = DEFAULT_INTENSITY;
    intensity = DEFAULT_INTENSITY;
  } else {
    intensity = value;
  }
});

// sizeInput
sizeInput.forEach((size, index) => {
  size.addEventListener("input", () => {
    let value = parseInt(size.value);
    if (value < MIN_SIZE || isNaN(value)) {
      value = MIN_SIZE;
      size.value = MIN_SIZE;
    } else if (value > MAX_SIZE) {
      value = MAX_SIZE;
      size.value = MAX_SIZE;
    }

    // 更新所有行中相同位置的灯泡大小
    document
      .querySelectorAll(`.light-row .circle:nth-child(${index + 1})`)
      .forEach((light) => {
        light.style.width = `${value}px`;
        light.style.height = `${value}px`;
      });
  });
});

// 添加颜色变化事件监听
colorInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    // 更新所有行中相同位置的灯泡颜色
    document
      .querySelectorAll(`.light-row .circle:nth-child(${index + 1})`)
      .forEach((light) => {
        // 更新背景色
        light.style.backgroundColor = input.value;

        // 更新颜色映射
        const colorClass = Array.from(light.classList).find((cls) => {
          return colorMap[cls];
        });
        // console.log("colorClass:", colorClass);
        // console.log("input.value:", input.value);
        // console.log("colorMap[colorClass]", colorMap);
        colorMap[colorClass] = input.value;

        // 如果灯是亮着的，更新光晕颜色
        if (light.style.boxShadow !== "") {
          light.style.boxShadow = `0 0 ${intensity}px ${input.value}`;
        }
      });
  });
});

// rowsInput
rowsInput.addEventListener("input", () => {
  let value = parseInt(rowsInput.value);
  if (value < 1 || isNaN(value)) {
    value = 1;
    rowsInput.value = 1;
  }

  const currentRows = lightContainer.children.length;

  if (value > currentRows) {
    // 添加新行
    for (let i = currentRows; i < value; i++) {
      let newLightRow = lightRow.cloneNode(true);
      // 确保新行的灯泡颜色与颜色选择器一致
      newLightRow.querySelectorAll(".circle").forEach((light, index) => {
        light.style.backgroundColor = colorInputs[index].value;
      });
      lightContainer.appendChild(newLightRow);
    }
  } else if (value < currentRows) {
    // 删除多余的行
    for (let i = currentRows; i > value; i--) {
      lightContainer.removeChild(lightContainer.lastChild);
    }
  }

  // 重新获取所有灯泡并应用当前的灯光状态
  const allLights = document.querySelectorAll(".circle");
  if (startButton.textContent === "Stop") {
    allLights.forEach((circle, index) => {
      if (index % 2 === 0) {
        const colorClass = Array.from(circle.classList).find(
          (cls) => colorMap[cls]
        );
        const shadowColor = colorMap[colorClass];
        circle.style.boxShadow = `0 0 ${intensity}px ${shadowColor}`;
      } else {
        circle.style.boxShadow = "";
      }
    });
  }
});
