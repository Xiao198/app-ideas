export function addShakeAnimation(element) {
  element.style.animation = "none";
  element.offsetHeight; // 触发重排
  element.style.animation = "shake 0.5s";
}

export function addButtonFeedback(button) {
  button.addEventListener("mousedown", () => {
    playClickSound();
    button.style.transform = "scale(0.95)";
    button.style.opacity = "0.8";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1)";
    button.style.opacity = "1";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.opacity = "1";
  });
}

function playClickSound() {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA"
  );
  audio.volume = 0.1;
  audio.play().catch(() => {}); // 忽略可能的自动播放限制错误
}
