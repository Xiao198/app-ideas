const binaryInput = document.getElementById("binaryInput");
const convertButton = document.getElementById("convertButton");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");
const resultValue = document.getElementById("resultValue");
const errorMessage = document.getElementById("errorMessage");

convertButton.addEventListener("click", () => {
  const binaryValue = binaryInput.value;
  const binaryArray = binaryValue.split("").reverse();
  for (let i = 0; i < binaryArray.length; i++) {
    if (binaryArray[i] !== "0" && binaryArray[i] !== "1") {
      errorMessage.innerText = "Please enter a valid binary number";
      return;
    }
  }
  resultValue.innerText = binaryArray.reduce((acc, curr, index) => {
    return acc + curr * Math.pow(2, index);
  }, 0);
  errorMessage.innerText = "";
});
resetButton.addEventListener("click", () => {
  binaryInput.value = "";
  resultValue.innerText = "";
  errorMessage.innerText = "";
});
