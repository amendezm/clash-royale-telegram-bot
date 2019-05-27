const bot = require("./services/bot/bot");
const getImage = require("./services/get_image");
const getCollectionDay = require("./services/collection_day");
const getWarDay = require("./services/war_day");
const getWarStandings = require("./services/war_standings");
const getMembers = require("./services/members");
const getDonations = require("./services/donations");
const getDonationsDelta = require("./services/donations_delta");
const getChests = require("./services/player/chests");
const getFavoriteCard = require("./services/player/favorite_card");
const getBattles = require("./services/clan_battles");
const inAndOuts = require("./services/in_and_outs");
const rankingChange = require("./services/ranking_change");
const membersTags = require("./services/player/tags");

getBattles();
inAndOuts();
rankingChange();

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

bot.onText(/\/donations_rank/, msg => {
  const chatId = msg.chat.id;
  getDonations(chatId);
});

bot.onText(/\/donations_delta_rank/, msg => {
  const chatId = msg.chat.id;
  getDonationsDelta(chatId);
});

bot.onText(/get_chests (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getChests(chatId, match[1] || membersTags[msg.from.first_name] || "");
});
bot.onText(/get_chests@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getChests(chatId, membersTags[msg.from.first_name]);
});

bot.onText(/\/get_favorite_card (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, match[1] || membersTags[msg.from.first_name] || "");
});

bot.onText(/\/get_favorite_card@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, membersTags[msg.from.first_name]);
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
