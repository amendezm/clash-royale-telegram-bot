const fetch = require("node-fetch");

const bot = require("./bot/bot");
const collectionDayFormat = require("./../utils/string_format")
  .collectionDayFormat;
const constants = require("./../constants/index");
const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getCollectionDay = chatId => {
  fetch(`${url}${clan}${tag}/war`, options)
    .then(res => res.json())
    .then(data => {
      if (data.state !== "collectionDay") {
        throw new Error("It is not collection day");
      }
      return data.participants.map(participant => ({
        name: participant.name,
        cards: participant.cardsEarned,
        played: participant.collectionDayBattlesPlayed
      }));
    })
    .then(participants =>
      participants.map(participant => [
        participant.name,
        `${participant.cards}`,
        `${participant.played}`
      ])
    )
    .then(resp => collectionDayFormat(resp))
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
};

module.exports = getCollectionDay;
