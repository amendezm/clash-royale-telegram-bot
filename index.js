const bot = require("./services/bot/bot");
const getImage = require("./services/get_image");
const getCollectionDay = require("./services/collection_day");
const getWarDay = require("./services/war_day");
const getWarStandings = require("./services/war_standings");
const getMembers = require("./services/members");
const getMembersByDonations = require("./services/donations");
const getChests = require("./services/player/chests");
const getFavoriteCard = require("./services/player/favorite_card");
const getBattles = require("./services/clan_battles");
const membersTags = require("./services/player/tags");

// getBattles();

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
  console.log(chatId);
});

bot.onText(/\/clan_image/, msg => {
  const chatId = msg.chat.id;
  getImage(chatId);
});

bot.onText(/\/collection_day/, msg => {
  const chatId = msg.chat.id;
  getCollectionDay(chatId);
});

bot.onText(/\/war_day/, msg => {
  const chatId = msg.chat.id;
  getWarDay(chatId);
});

bot.onText(/\/war_standings/, msg => {
  const chatId = msg.chat.id;
  getWarStandings(chatId);
});

bot.onText(/\/members/, msg => {
  const chatId = msg.chat.id;
  getMembers(chatId);
});

bot.onText(/\/donations/, msg => {
  const chatId = msg.chat.id;
  getMembersByDonations(chatId);
});

bot.onText(/get_chests/, (msg, match) => {
  const chatId = msg.chat.id;
  getChests(chatId, match[1] || membersTags[msg.from.first_name] || "");
});

bot.onText(/\/get_favorite_card/, (msg, match) => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, match[1] || membersTags[msg.from.first_name] || "");
});

bot.onText(/my_tag/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, membersTags[msg.from.first_name]);
});

bot.on("message", msg => {
  const chatId = msg.chat.id;
  console.log(msg.from.first_name);
  console.log(msg.from.id);
  // bot.sendMessage(chatId, "Received your message");
});
