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
const getCurrentDeck = require("./services/player/current_deck");
const getBattles = require("./services/clan_battles");
const inAndOuts = require("./services/in_and_outs");
const rankingChange = require("./services/ranking_change");
const warDayNotification = require("./services/war_begin");
const membersTags = require("./services/player/tags");
const getWinsPercent = require("./services/player/percents").getWinsPercent;
const getLossesPercent = require("./services/player/percents").getLossesPercent;
const getDrawsPercent = require("./services/player/percents").getDrawsPercent;
const getMaxTrophiesRank = require("./services/best_trophies_rank");

// getBattles();
inAndOuts();
rankingChange();
warDayNotification();

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/Hola/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hola ${msg.from.id}!`);
});

bot.onText(/\/clan_tag/, (msg, match) => {
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

bot.onText(/\/max_trophies_rank/, msg => {
  const chatId = msg.chat.id;
  console.log("sdgsg");
  getMaxTrophiesRank(chatId);
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
  getChests(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/get_chests@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getChests(chatId, membersTags[msg.from.id]);
});

bot.onText(/\/get_favorite_card (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/\/get_favorite_card@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getFavoriteCard(chatId, membersTags[msg.from.id]);
});

bot.onText(/\/get_current_deck (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getCurrentDeck(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/\/get_current_deck@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getCurrentDeck(chatId, membersTags[msg.from.id]);
});

bot.onText(/\/get_wins_percent (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getWinsPercent(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/\/get_wins_percent@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getWinsPercent(chatId, membersTags[msg.from.id]);
});
bot.onText(/\/get_losses_percent (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getLossesPercent(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/\/get_losses_percent@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getLossesPercent(chatId, membersTags[msg.from.id]);
});
bot.onText(/\/get_draws_percent (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  getDrawsPercent(chatId, match[1] || membersTags[msg.from.id] || "");
});

bot.onText(/\/get_draws_percent@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  getDrawsPercent(chatId, membersTags[msg.from.id]);
});

bot.onText(/my_tag@CubanFightersBot/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, membersTags[msg.from.id]);
});

bot.on("message", msg => {
  const chatId = msg.chat.id;
  console.log(msg.from.first_name);
  console.log(msg.from.id);
  // bot.sendMessage(chatId, "Received your message");
});
