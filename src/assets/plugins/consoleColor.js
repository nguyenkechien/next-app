const { r, g, b, w, c, m, y, k } = [
  ['r', 1],
  ['g', 2],
  ['b', 4],
  ['w', 7],
  ['c', 6],
  ['m', 5],
  ['y', 3],
  ['k', 0],
].reduce(
  (cols, col) => ({
    ...cols,
    [col[0]]: f => `\x1b[3${col[1]}m${f}\x1b[0m`,
  }),
  {},
);

const ConsoleColor = { r, g, b, w, c, m, y, k };
module.exports = { ConsoleColor };
