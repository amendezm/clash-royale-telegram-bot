const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants");
const membersFormat = require("./../utils/string_format").membersFormat;

const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const clan_tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getMembers = chatId => {
  fetch(`${url}${clan}${clan_tag}`, options)
    .then(res => res.json())
    .then(data => {
      return data.members.map(member => ({
        level: member.expLevel,
        name: member.name,
        trophies: member.trophies
      }));
    })
    .then(array =>
      array.map(obj => [`Lvl ${obj.level}`, obj.name, `${obj.trophies}`])
    )
    .then(array => membersFormat(array))
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
};

module.exports = getMembers;
