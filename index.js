const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
const collectionDayFormat = require("./utils/string_format");

// replace the value below with the Telegram token you receive from @BotFather
const token = "778727907:AAEPS8kLgrWikSqzyWc0TMGdvlti3L47CJQ";
const url = "https://api.royaleapi.com/clan/";
const options = {
  method: "get",
  headers: {
    auth:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU0OSwiaWRlbiI6IjU0MjcxNjA1Mjg5MTUwMDU1NCIsIm1kIjp7fSwidHMiOjE1NTYyMDE5MjkzNDR9.fXqJjYEf4UDHvlfJANuQf6QL3UjGfg957imWMrceG38"
  }
};

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/Hola/, msg => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, `Hola ${msg.from.first_name}!`);
});

bot.onText(/\/get_tag/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "#PPUUUP2Y");
});

bot.onText(/\/clan_image/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  fetch(`${url}PPUUUP2Y`, options)
    .then(res => res.json())
    .then(data => {
      //   return data.badge.image
      bot.sendPhoto(chatId, data.badge.image);
    });
});

bot.onText(/\/collection_day/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  fetch(`${url}PPUUUP2Y/war`, options)
    .then(res => res.json())
    .then(data =>
      data.participants.map(participant => ({
        name: participant.name,
        cards: participant.cardsEarned,
        played: participant.collectionDayBattlesPlayed
      }))
    )
    .then(array =>
      array.map(obj => [obj.name, `${obj.cards}`, `${obj.played}`])
    )
    .then(resp => collectionDayFormat(resp))
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    });
});

bot.onText(/\/members/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  fetch(`${url}PPUUUP2Y`, options)
    .then(res => res.json())
    .then(data => {
      return data.members.map(member => ({
        level: member.expLevel,
        name: member.name,
        trophies: member.trophies
      }));
    })
    .then(array =>
      array.map(
        obj => `Lvl ${obj.level}   ${obj.name}_______________${obj.trophies}`
      )
    )
    .then(resp => {
      bot.sendMessage(chatId, resp.join("\n"));
    })
    .catch(err => {
      bot.sendMessage(chatId, err.message);
    });
});

// Listen for any kind of message. There are different kinds of
// messages.

// fetch(`${url}PPUUUP2Y`, options)
//   .then(res => res.json())
//   .then(data => data.members)
//   .then(members => members.map((member = member.name)));
//   .then(members => members.map(member => member.name))
//   .then(names => {
// console.log(names[0]);
//   });

// bot.on("message", msg => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message

//   // .then(data => data.members.map(member => member.name))
//   // .then(resp => {
//   //   console.log(resp);
//   //   bot.sendMessage(chatId, "alexis");
//   // });
//   bot.sendMessage(chatId, "Received your message");
// });
