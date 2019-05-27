const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants");

const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const clan_tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

let actualMembers = [];

const in_and_outs = () => {
  setInterval(() => {
    fetch(`${url}${clan}${clan_tag}`, options)
      .then(res => res.json())
      .then(data => data.members.map(member => member.name))
      .then(members => {
        let save = actualMembers;
        actualMembers = members;
        return compareMembers(save, members);
      })
      .then(resp => {
        if (resp.length) {
          bot.sendMessage(-1001375845440, resp.join("\n"));
        }
      })
      .catch(err => {
        bot.sendMessage(-1001375845440, err.message);
      });
  }, 10000);
};

const compareMembers = (before, after) => {
  if (actualMembers === [] || before.length === after.length) {
    return [];
  } else if (before.length > after.length) {
    return before
      .filter(member => after.indexOf(member) === -1)
      .map(member => `${member} has left the clan`);
  } else {
    return after
      .filter(member => before.indexOf(member) === -1)
      .map(member => `${member} has joined the clan`);
  }
};

module.exports = in_and_outs;
