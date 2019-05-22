const fetch = require("node-fetch");

const bot = require("./bot/bot");
const constants = require("./../constants/index");
const url = constants.BASE_URL;
const clan = constants.ENDPOINTS.clan;
const tag = constants.CLAN_TAG;
const options = constants.OPTIONS;

const getWarStandings = chatId => {
  fetch(`${url}${clan}${tag}/war`, options)
    .then(res => res.json())
    .then(data => {
      if (!data.standings) {
        throw new Error("No war standings");
      }
      return data.standings.map(standing => ({
        name: standing.name,
        participants: standing.participants,
        battles: standing.battlesPlayed,
        wins: standing.wins
      }));
    })
    .then(clans => toStandingsArray(clans))
    .then(resp => {
      console.log(resp.join("\n"));
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
};

const toStandingsArray = array => {
  const maxName = array.reduce((a, b) => {
    return a > b.name.length ? a : b.name.length;
  }, 0);
  console.log(maxName);
  const maxParticipants = array.reduce((a, b) => {
    return a > b.participants ? a : b.participants;
  }, 0);
  return array.map(clan => {
    return `${fillName(clan.name, maxName)}________left - ${maxParticipants -
      clan.battles} / wins - ${clan.wins}`;
  });
};

const fillName = (name, max) => {
  console.log(name.length);
  for (let i = name.length; i < max; i++) {
    name = name.concat("_");
  }
  return name;
};

module.exports = getWarStandings;
