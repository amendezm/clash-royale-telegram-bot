const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants");

const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const clan_tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getDonations = chatId => {
  fetch(`${url}${clan}${clan_tag}`, options)
    .then(res => res.json())
    .then(data => {
      return data.members.map(member => ({
        name: member.name,
        donations: member.donations
      }));
    })
    .then(members =>
      members.sort((a, b) => (a.donations < b.donations ? 1 : -1))
    )
    .then(members =>
      members.map(member => donationsFormat(member.name, member.donations))
    )
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
};

const donationsFormat = (name, donations) => {
  let donated = donations + "";
  for (let i = donated.length; i < 4; i++) {
    donated = " " + donated;
  }
  return `${donated} => ${name}`;
};

module.exports = getDonations;
