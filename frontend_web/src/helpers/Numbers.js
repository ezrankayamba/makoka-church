let numOr0 = (n) => (isNaN(n) ? 0 : parseFloat(n));
const Numbers = {
  fmt: (num, decimals = 0) =>
    Number(num)
      .toFixed(decimals)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"),
  sum: (nums) => nums.reduce((a, b) => numOr0(a) + numOr0(b), 0),
  dpts: (num) => (Math.round(num * 100) / 100).toFixed(2),
};
export default Numbers;
