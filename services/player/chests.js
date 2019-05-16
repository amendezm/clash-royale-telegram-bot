const fetch = require("node-fetch");

const bot = require("./../bot");
const constants = require("./../../constants");

const url = constants.BASE_URL;
const player = constants.ENDPOINTS.player;
const options = constants.OPTIONS;

const getChests = (chatId, player_tag) => {
  console.log(player_tag);
  fetch(`${url}${player}${player_tag}/chests`, options)
    .then(res => res.json())
    .then(chests => chests.upcoming)
    .then(upcoming => {
      bot.sendMessage(chatId, upcoming.join("\n"));
    })
    .catch(error => {
      bot.sendMessage(chatId, error.message);
    });
};

module.exports = getChests;
