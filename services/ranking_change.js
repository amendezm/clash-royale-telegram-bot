const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants");

const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const clan_tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

let actualMembers = [];

const rankingChange = () => {
  setInterval(() => {
    fetch(`${url}${clan}${clan_tag}`, options)
      .then(res => res.json())
      .then(data => {
        return data.members.map(member => member.name);
      })
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
        // bot.sendMessage(-1001375845440, err.message);
        console.log(err);
      });
  }, 5000);
};

const compareMembers = (before, after) => {
  if (!before.length) {
    return [];
  }
  let tester = before.length < after.length ? before : after;
  tester = tester.filter(
    memberName => before.indexOf(memberName) !== after.indexOf(memberName)
  );
  if (!tester.length) {
    return [];
  }
  tester = tester.map(memberName => {
    const quantity = before.indexOf(memberName) - after.indexOf(memberName);
    return `${memberName} => ${quantity > 0 ? `+${quantity}` : quantity}`;
  });
  return ["Ranking has changed", ...tester];
};

module.exports = rankingChange;
