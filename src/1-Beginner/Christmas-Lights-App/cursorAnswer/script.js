// 配置对象：集中管理所有常量和配置
const CONFIG = {
  colors: {
    red: "#c0392b",
    yellow: "#f1c40f",
    blue: "#64fcfe",
    green: "#2ecc71",
  },
  defaults: {
    interval: 1000,
    intensity: 10,
    size: 50,
    rows: 1,
  },
  limits: {
    size: {
      min: 20,
      max: 100,
    },
  },
};

class ChristmasLights {
  constructor() {
    try {
      this.timer = null;
      this.isRunning = false;
      this.initElements();
      this.initValues();
      this.initEventListeners();
      console.log("Christmas Lights initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Christmas Lights:", error);
    }
  }

  initValues() {
    this.interval =
      parseInt(this.inputs.interval.value) || CONFIG.defaults.interval;
    this.intensity =
      parseInt(this.inputs.intensity.value) || CONFIG.defaults.intensity;

    this.inputs.interval.min = 0;
    this.inputs.intensity.min = 0;

    this.inputs.sizes.forEach((input) => {
      input.min = CONFIG.limits.size.min;
      input.max = CONFIG.limits.size.max;
      input.value = CONFIG.defaults.size;
    });

    this.inputs.rows.min = 1;
    this.inputs.rows.value = CONFIG.defaults.rows;
  }

  initElements() {
    this.lightContainer = document.querySelector(".light-container");
    this.startButton = document.getElementById("start-button");
    this.inputs = {
      interval: document.getElementById("interval-input"),
      intensity: document.getElementById("intensity-input"),
      sizes: document.querySelectorAll(".size-input"),
      rows: document.getElementById("rows-input"),
    };
  }

  initEventListeners() {
    this.startButton.addEventListener("click", () => this.toggleLights());

    // 使用 input 事件
    this.inputs.interval.addEventListener("input", (e) => {
      const value = parseInt(e.target.value) || CONFIG.defaults.interval;
      this.interval = Math.max(0, value);

      if (this.isRunning) {
        this.stopAnimation();
        this.startAnimation();
      }
    });

    this.inputs.intensity.addEventListener("input", (e) => {
      const value = parseInt(e.target.value) || CONFIG.defaults.intensity;
      this.intensity = Math.max(0, value);

      if (this.isRunning) {
        this.applyLightEffect();
      }
    });

    this.inputs.sizes.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        let value = parseInt(e.target.value) || CONFIG.defaults.size;
        value = Math.max(
          CONFIG.limits.size.min,
          Math.min(value, CONFIG.limits.size.max)
        );

        document
          .querySelectorAll(`.light-row .circle:nth-child(${index + 1})`)
          .forEach((light) => {
            light.style.width = `${value}px`;
            light.style.height = `${value}px`;
          });
      });
    });

    this.inputs.rows.addEventListener("input", (e) => {
      const value = Math.max(1, parseInt(e.target.value) || 1);
      this.updateRows(value);
    });
  }

  toggleLights() {
    this.isRunning = !this.isRunning;
    this.startButton.textContent = this.isRunning ? "Stop" : "Start";

    if (this.isRunning) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.applyLightEffect();
    this.timer = setInterval(() => this.applyLightEffect(), this.interval);
  }

  stopAnimation() {
    clearInterval(this.timer);
    this.clearAllLights();
  }

  applyLightEffect() {
    const allLights = document.querySelectorAll(".circle");
    const timestamp = Date.now();
    const isEvenCycle = Math.floor(timestamp / this.interval) % 2 === 0;

    allLights.forEach((light, index) => {
      const isEvenLight = index % 2 === 0;
      const shouldLight = isEvenCycle ? isEvenLight : !isEvenLight;
      const colorClass = this.getLightColor(light);

      if (shouldLight) {
        light.style.boxShadow = `0 0 ${this.intensity}px ${CONFIG.colors[colorClass]}`;
      } else {
        light.style.boxShadow = "";
      }
    });
  }

  getLightColor(light) {
    return Array.from(light.classList).find((cls) => CONFIG.colors[cls]);
  }

  clearAllLights() {
    const allLights = document.querySelectorAll(".circle");
    allLights.forEach((light) => {
      light.style.boxShadow = "";
    });
  }

  // 工具方法
  validateNumber(value, min, defaultValue) {
    const num = parseInt(value);
    return isNaN(num) || num < min ? defaultValue : num;
  }

  // 事件处理方法
  handleIntervalChange(e) {
    const value = this.validateNumber(
      e.target.value,
      0,
      CONFIG.defaults.interval
    );
    this.interval = value;
    e.target.value = value;

    if (this.isRunning) {
      this.stopAnimation();
      this.startAnimation();
    }
  }

  handleIntensityChange(e) {
    const value = this.validateNumber(
      e.target.value,
      0,
      CONFIG.defaults.intensity
    );
    this.intensity = value;
    e.target.value = value;

    if (this.isRunning) {
      this.applyLightEffect();
    }
  }

  handleSizeChange(e, index) {
    let value = this.validateNumber(
      e.target.value,
      CONFIG.limits.size.min,
      CONFIG.defaults.size
    );
    value = Math.min(value, CONFIG.limits.size.max);
    e.target.value = value;

    document
      .querySelectorAll(`.light-row .circle:nth-child(${index + 1})`)
      .forEach((light) => {
        light.style.width = `${value}px`;
        light.style.height = `${value}px`;
      });
  }

  handleRowsChange(e) {
    const value = this.validateNumber(e.target.value, 1, CONFIG.defaults.rows);
    e.target.value = value;
    this.updateRows(value);
  }

  updateRows(newRows) {
    const currentRows = this.lightContainer.children.length;
    const template = this.lightContainer.firstElementChild;

    if (newRows > currentRows) {
      for (let i = currentRows; i < newRows; i++) {
        const newRow = template.cloneNode(true);
        this.lightContainer.appendChild(newRow);
      }
    } else if (newRows < currentRows) {
      for (let i = currentRows; i > newRows; i--) {
        this.lightContainer.removeChild(this.lightContainer.lastChild);
      }
    }

    if (this.isRunning) {
      this.applyLightEffect();
    }
  }

  handleError(method, error) {
    console.error(`Error in ${method}:`, error);
  }

  destroy() {
    this.stopAnimation();
  }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ChristmasLights();
});
