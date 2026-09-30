module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => [
    `eslint --fix ${filenames.map((f) => `"${f}"`).join(" ")}`,
    `biome format --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
  "*.{json}": (filenames) => [`biome format --write ${filenames.map((f) => `"${f}"`).join(" ")}`],
};
