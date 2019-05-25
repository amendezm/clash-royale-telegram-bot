const fetch = require("node-fetch");

const bot = require("./bot/bot");
const warDayFormat = require("./../utils/string_format").warDayFormat;
const constants = require("./../constants/index");
const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getWarDay = chatId => {
  fetch(`${url}${clan}${tag}/war`, options)
    .then(res => res.json())
    .then(data => {
      if (data.state !== "warDay") {
        throw new Error("It is not war day");
      }
      return data.participants.map(participant => ({
        name: participant.name,
        battles: participant.battlesPlayed,
        wins: participant.wins,
        cards: participant.cardsEarned
      }));
    })
    .then(participants =>
      participants.map(participant => [
        participant.name,
        `${participant.wins}`,
        `${participant.battles}`,
        participant.cards
      ])
    )
    .then(resp => warDayFormat(resp))
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
};

module.exports = getWarDay;
