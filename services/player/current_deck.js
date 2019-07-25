const fetch = require("node-fetch");

const bot = require("../bot/bot");
const constants = require("./../../constants");

const url = constants.BASE_URL;
const player = constants.ENDPOINTS.player;
const options = constants.OPTIONS;

const getCurrentDeck = (chatId, player_tag) => {
  console.log(player_tag);
  if (!player_tag) {
    bot.sendMessage(chatId, "Invalid player tag");
    return;
  }
  fetch(`${url}${player}${player_tag}`, options)
    .then(res => res.json())
    .then(player => player.currentDeck)
    .then(deck => {
      const album=deck.map(card=>(
      {
        type:"photo",
        media: card.icon,
        caption: card.name
      }))
        bot.sendMediaGroup(chatId, album);
    })
    .catch(error => {
      bot.sendMessage(chatId, error.message);
    });
};

module.exports = getCurrentDeck;
