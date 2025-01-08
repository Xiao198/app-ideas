import { people } from "./const.js";

const menuContainer = document.querySelector(".menu-container");
const contentContainer = document.querySelector(".content-container");

people.forEach((person, index) => {
  const menuItem = document.createElement("div");
  menuItem.innerHTML = `
    <div class="menu-item-title">
        <span class="title" data-id=${index}>${person.name}</span>
    </div>
    `;

  menuItem.classList.add("menu-item");
  menuContainer.appendChild(menuItem);
});

const handleClickTitle = (e) => {
  const id = e.target.dataset.id;
  // 先判断当前menu-item下面是否有content-item
  const menuItem = document.querySelectorAll(".menu-item");
  const menuItemTitle = document.querySelectorAll(".menu-item-title");
  menuItemTitle.forEach((item) => {
    item.classList.remove("active-title");
  });
  menuItemTitle[id].classList.add("active-title");
  if (menuItem[id].children.length > 1) {
    menuItem[id].removeChild(menuItem[id].lastElementChild);
  } else {
    const contentItem = document.createElement("div");
    contentItem.innerHTML = `
        <span class="content">${people[id].street}</span>
        <span class="content">${people[id].city}</span>
        <span class="content">${people[id].state}</span>
        <span class="content">${people[id].country}</span>
    `;
    contentItem.classList.add("menu-item-content");
    menuItem[id].appendChild(contentItem);
  }
};

const handleClickContent = (e) => {
  const allContent = document.querySelectorAll(".content");
  allContent.forEach((item) => {
    item.classList.remove("active-content");
  });

  const contentItem = e.target;
  contentItem.classList.add("active-content");
  contentContainer.innerHTML = `${e.target.textContent}`;
};

// 使用事件委托，将事件监听器添加到父容器上
menuContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("title")) {
    handleClickTitle(e);
  } else if (e.target.classList.contains("content")) {
    handleClickContent(e);
  }
});
