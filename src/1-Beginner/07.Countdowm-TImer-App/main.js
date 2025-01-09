import EventForm from "./components/EventForm/index.js";
import CountdownTimer from "./components/CountdownTimer/index.js";
import EventService from "./services/eventService.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("countdown-container");
  const eventService = new EventService();
  const countdownTimer = new CountdownTimer(container);

  // 加载已保存的事件
  const savedEvents = eventService.loadEvents();
  savedEvents.forEach((event) => {
    countdownTimer.addTimer(event.id, event.name, new Date(event.targetDate));
  });

  // 创建表单并处理新事件
  new EventForm(container, (name, dateTime) => {
    // 创建新事件对象
    const newEvent = {
      id: Date.now(),
      name,
      targetDate: dateTime.toISOString(),
    };

    // 保存到 localStorage
    eventService.addEvent(newEvent);

    // 添加到界面
    countdownTimer.addTimer(newEvent.id, name, dateTime);
  });
});
