let currentLight = 0;
circleLights.forEach((circle, index) => {
  if (index === currentLight) {
    circle.style.boxShadow = `0 0 ${intensity}px white`;
  } else {
    circle.style.boxShadow = "";
  }
});
currentLight = (currentLight + 1) % circleLights.length;