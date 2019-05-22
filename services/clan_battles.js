const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants/index");
const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

let now = new Date(Date.now());
console.log(now);
let utc =
  Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    new Date().getUTCHours(),
    new Date().getUTCMinutes(),
    new Date().getUTCSeconds()
  ) / 1000;
console.log(utc);

const getBattles = () => {
  setInterval(() => {
    console.log("dsdgsd");
    fetch(`${url}${clan}${tag}/battles?type=all&page=0&max=3`, options)
      .then(res => res.json())
      .then(battles => battles.filter(battle => battle.utcTime > utc))
      .then(battles => {
        console.log("enter");
        console.log(JSON.stringify(battles));
        battles.forEach(battle => {
          bot.sendMessage(
            -1001375845440,
            `${battle.team[0].name} ${battle.teamCrowns} - ${
              battle.opponentCrowns
            } ${battle.opponent[0].name}`
          );
        });
        utc = battles.length ? battles[0].utcTime : utc;
        console.log(utc);
        if (battles.length) console.log(battles[0].utcTime);
      })
      .catch(err => {
        // bot.sendMessage(-1001375845440, err.message);
      });
  }, 30000);
};

module.exports = getBattles;
