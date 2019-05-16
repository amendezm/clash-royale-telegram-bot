const bot = require("./services/bot");
const getImage = require("./services/get_image");
const getCollection = require("./services/collection_day");
const getMembers = require("./services/members");
const getChests = require("./services/player/chests");
const getFavoriteCard = require("./services/player/favorite_card");

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/Hola/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hola ${msg.from.first_name}!`);
});

bot.onText(/\/get_tag/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "#PPUUUP2Y");
});

bot.onText(/\/clan_image/, msg => {
  const chatId = msg.chat.id;
  getImage(chatId);
});

bot.onText(/\/collection_day/, (msg, match) => {
  const chatId = msg.chat.id;
  getCollection(chatId);
});

bot.onText(/\/members/, msg => {
  const chatId = msg.chat.id;
  getMembers(chatId);
});

bot.onText(/get_chests (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getChests(chatId, match[1]);
});

bot.onText(/get_favorite_card (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, match[1]);
});

bot.on("message", msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Received your message");
});
