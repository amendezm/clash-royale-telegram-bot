const fetch = require("node-fetch");

const bot = require("../bot/bot");
const constants = require("./../../constants");

const url = constants.BASE_URL;
const player = constants.ENDPOINTS.player;
const options = constants.OPTIONS;

const getChests = (chatId, player_tag) => {
  if (!player_tag) {
    bot.sendMessage(chatId, "Invalid player tag");
    return;
  }
  fetch(`${url}${player}${player_tag}/chests`, options)
    .then(res => res.json())
    .then(chests => {
      bot.sendMessage(chatId, chestSort(chests));
    })
    .catch(error => {
      bot.sendMessage(chatId, error.message);
    });
};

const chestSort = chests => {
  let { upcoming, ...others } = chests;
  let keyChest = {};
  let numbers = [];
  for (chest in others) {
    keyChest[others[chest]] = chest;
    numbers = [...numbers, others[chest]];
  }
  numbers = numbers.sort((a, b) => (a < b ? -1 : 1));
  return (
    upcoming.join("\n") +
    "\n" +
    numbers.map(number => `${keyChest[number]} +${number}`).join("\n")
  );
};

module.exports = getChests;
