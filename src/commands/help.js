const Command = require("../structures/Command");
module.exports = class Help extends Command {
    constructor(bot) {
        super(bot, {
            name: "help",
            category: "Utility",
            cooldown: 5000
        })
    }
    run(message, [toSearch]) {
        if(!toSearch) return message.channel.send(this.bot.allCmds);
        this.bot.handler.getCommand()
    }
};