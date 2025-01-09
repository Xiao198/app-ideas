export default class EventService {
  constructor() {
    this.events = this.loadEvents();
  }

  loadEvents() {
    const saved = localStorage.getItem("countdown-events");
    return saved ? JSON.parse(saved) : [];
  }

  saveEvents() {
    localStorage.setItem("countdown-events", JSON.stringify(this.events));
  }

  addEvent(event) {
    if (!event.id) {
      event.id = Date.now();
    }
    this.events.push(event);
    this.saveEvents();
    return event;
  }

  removeEvent(id) {
    this.events = this.events.filter((event) => event.id !== id);
    this.saveEvents();
  }

  getEvents() {
    return this.events;
  }
}
