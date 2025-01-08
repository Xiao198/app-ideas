import { people } from "./const.js";

class PeopleList {
  constructor(data) {
    this.people = data;
    this.menuContainer = document.querySelector(".menu-container");
    this.contentContainer = document.querySelector(".content-container");
    this.init();
  }

  init() {
    this.renderList();
    this.bindEvents();
  }

  renderList() {
    this.menuContainer.innerHTML = this.people
      .map(
        (person, index) => `
                <div class="title" data-id="${index}">
                    ${person.name}
                </div>
            `
      )
      .join("");
  }

  renderDetail(id) {
    const person = this.people[id];
    this.contentContainer.innerHTML = `
            <span class="content">${person.street}</span>
            <span class="content">${person.city}</span>
            <span class="content">${person.state}</span>
            <span class="content">${person.country}</span>
            <span class="content">${person.telephone}</span>
            <span class="content">${person.birthday}</span>
        `;
  }

  bindEvents() {
    this.menuContainer.addEventListener("click", (e) => {
      const titleElement = e.target.closest(".title");
      if (!titleElement) return;

      this.updateActiveTitle(titleElement);
      this.renderDetail(titleElement.dataset.id);
    });
  }

  updateActiveTitle(selectedTitle) {
    const titles = this.menuContainer.querySelectorAll(".title");
    titles.forEach((title) => title.classList.remove("active-title"));
    selectedTitle.classList.add("active-title");
  }
}

// 初始化应用
new PeopleList(people);
