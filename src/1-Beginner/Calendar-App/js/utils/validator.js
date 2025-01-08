export function validateInput(value, maxDigits) {
  // 移除小数点和负号进行位数检查
  const numStr = value.replace(/[.-]/g, "");
  if (numStr.length > maxDigits) {
    return false;
  }

  // 检查小数点数量
  const decimalPoints = (value.match(/\./g) || []).length;
  if (decimalPoints > 1) {
    return false;
  }

  return true;
}

export function validateResult(result, maxDigits) {
  if (!isFinite(result)) {
    return false;
  }

  const resultStr = Math.abs(result).toString();
  const [integer] = resultStr.split(".");

  return integer.length <= maxDigits;
}
