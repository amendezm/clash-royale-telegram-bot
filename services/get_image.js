const fetch = require("node-fetch");

const bot = require("./bot");
const constants = require("./../constants");

const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const clan_tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getImage = chatId => {
  fetch(`${url}${clan}${clan_tag}`, options)
    .then(res => res.json())
    .then(clan => clan.badge.image)
    .then(image => {
      bot.sendPhoto(chatId, image);
    })
    .catch(error => {
      bot.sendMessage(chatId, error.message);
    });
};

module.exports = getImage;
