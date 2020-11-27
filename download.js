const pMap = require('golgoth/lib/pMap');
const download = require('firost/download');

const types = ['J', 'Q', 'K'];
const colors = ['S', 'D', 'C', 'H'];
(async () => {
  await pMap(types, async (type) => {
    await pMap(colors, async (color) => {
      const basename = `${type}${color}.png`;
      await download(
        `https://deckofcardsapi.com/static/img/${basename}`,
        `./assets/cards/${basename}`
      );
    });
  });
})();
