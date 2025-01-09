export default class EventForm {
  constructor(container, onSubmit) {
    this.container = container;
    this.onSubmit = onSubmit;
    this.init();
  }

  init() {
    this.element = document.createElement("form");
    this.element.className = "event-form";
    this.element.id = "eventForm"; // 添加 ID
    this.render();
    this.bindEvent();
  }

  render() {
    this.element.innerHTML = `
            <div class="form-group">
                <label for="eventName">事件名称:</label>
                <input type="text" id="eventName" required>
            </div>
            <div class="form-group">
                <label for="eventDate">日期:</label>
                <input type="date" id="eventDate" required>
            </div>
            <div class="form-group">
                <label for="eventTime">时间（可选）:</label>
                <input type="time" id="eventTime">
            </div>
            <button type="submit">开始倒计时</button>
        `;
    this.container.appendChild(this.element);
  }

  bindEvent() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value || "00:00";

    if (!name.trim()) {
      alert("请输入事件名称");
      return;
    }

    const dateTime = new Date(`${date}T${time}`);

    if (isNaN(dateTime.getTime())) {
      alert("请输入有效的日期和时间");
      return;
    }

    if (dateTime <= new Date()) {
      alert("请选择将来的时间");
      return;
    }

    // 调用回调函数，传递事件数据
    this.onSubmit?.(name, dateTime);

    // 重置表单
    this.element.reset();
  }
}
