export function formatDisplay(value) {
  if (value === "ERR") return value;

  // 处理负数
  const isNegative = value.startsWith("-");
  const absValue = isNegative ? value.slice(1) : value;

  // 分离整数和小数部分
  let [integer, decimal] = absValue.split(".");

  // 添加千位分隔符
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 组合结果
  let result = decimal ? `${integer}.${decimal}` : integer;
  return isNegative ? `-${result}` : result;
}
