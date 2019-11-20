const Command = require("../structures/Command");
module.exports = class Help extends Command {
    constructor(bot) {
        super(bot, {
            name: "play",
            category: "Music",
            cooldown: 5000
        })
    }
    run(message, args) {
        message.reply(args)
    }
};  