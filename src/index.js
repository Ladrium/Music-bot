const MusicClient = require("./structures/MusicClient");
const Handler = require("./structures/Handler");
const config = require("./config");

const bot = new MusicClient()
bot.handler = new Handler(bot);

bot.login(config.token);
