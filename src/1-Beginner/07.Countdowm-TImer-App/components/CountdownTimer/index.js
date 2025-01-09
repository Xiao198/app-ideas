export default class CountdownTimer {
  constructor(container) {
    this.container = container;
    this.timers = new Map(); // 存储多个倒计时
  }

  // 添加新的倒计时
  addTimer(id, name, targetDate) {
    // 确保参数顺序正确
    const timerElement = this.createTimerElement(id, name);
    this.container.appendChild(timerElement);

    const intervalId = setInterval(() => {
      this.updateTimer(id, targetDate);
    }, 1000);

    this.timers.set(id, {
      element: timerElement,
      intervalId: intervalId,
      name: name,
      targetDate: targetDate,
    });

    this.updateTimer(id, targetDate);
  }

  // 创建倒计时元素
  createTimerElement(id, name) {
    const element = document.createElement("div");
    element.className = "countdown-item";
    element.innerHTML = /*html*/ `
            <p class="countdown-item-title">${name}</p>
            <div class="countdown-item-time">
                <div class="time-item">
                    <span class="time-item-number" data-days>00</span>
                    <span class="time-item-text">Days</span>
                </div>
                <div class="time-item">
                    <span class="time-item-number" data-hours>00</span>
                    <span class="time-item-text">Hours</span>
                </div>
                <div class="time-item">
                    <span class="time-item-number" data-minutes>00</span>
                    <span class="time-item-text">Minutes</span>
                </div>
                <div class="time-item">
                    <span class="time-item-number" data-seconds>00</span>
                    <span class="time-item-text">Seconds</span>``
                </div>
            </div>
        `;
    return element;
  }

  // 更新倒计时显示
  updateTimer(id, targetDate) {
    const timer = this.timers.get(id);
    if (!timer) return;

    const now = new Date();
    const diff = new Date(targetDate) - now;

    if (diff <= 0) {
      // 倒计时结束
      clearInterval(timer.intervalId);
      this.timers.delete(id);
      timer.element.remove();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const element = timer.element;
    element.querySelector("[data-days]").textContent = String(days).padStart(
      2,
      "0"
    );
    element.querySelector("[data-hours]").textContent = String(hours).padStart(
      2,
      "0"
    );
    element.querySelector("[data-minutes]").textContent = String(
      minutes
    ).padStart(2, "0");
    element.querySelector("[data-seconds]").textContent = String(
      seconds
    ).padStart(2, "0");
  }
}
