const BASE_URL = "https://api.royaleapi.com/";

const TOKEN = "778727907:AAEPS8kLgrWikSqzyWc0TMGdvlti3L47CJQ";

const CLAN_TAG = "PPUUUP2Y";

const OPTIONS = {
  method: "get",
  headers: {
    auth:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU0OSwiaWRlbiI6IjU0MjcxNjA1Mjg5MTUwMDU1NCIsIm1kIjp7fSwidHMiOjE1NTYyMDE5MjkzNDR9.fXqJjYEf4UDHvlfJANuQf6QL3UjGfg957imWMrceG38"
  }
};

const ENDPOINTS = {
  clan: "clan/",
  player: "player/"
};

module.exports.BASE_URL = BASE_URL;
module.exports.TOKEN = TOKEN;
module.exports.CLAN_TAG = CLAN_TAG;
module.exports.OPTIONS = OPTIONS;
module.exports.ENDPOINTS = ENDPOINTS;
