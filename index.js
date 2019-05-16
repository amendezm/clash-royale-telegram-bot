const bot = require("./services/bot");
const getImage = require("./services/get_image");
const getCollection = require("./services/collection_day");
const getMembers = require("./services/members");

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

bot.on("message", msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Received your message");
});
