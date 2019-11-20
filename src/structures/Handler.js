const { readdirSync } = require("fs");
module.exports = class Handler {
    constructor(bot) {
        this.bot = bot;
        this.loadEvents();
        this.loadCommands();
    }
    loadEvents() {
        const events = readdirSync(require("path").resolve(__dirname, "../events/")).filter((file) => file.endsWith(".js"));

        for (const file of events) {
            const evt = require(`../events/${file}`);

            const eName = file.split(".")[0];
            this.bot.on(eName, evt.bind(null, this.bot));
        }
    };
    loadCommands() {
        const files = readdirSync(require("path").resolve(__dirname, `../commands`)).filter((f) => f.endsWith("js"));
        for (const file of files) {
            let pull = require(`../commands/${file}`);
            pull = new pull(this.bot);
            this.bot.commands.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach((alias) => this.bot.aliases.set(alias, pull.name));
        }
    }
    getCommand(name) {
        return this.bot.commands.get(name) || this.bot.commands.get(this.bot.aliases.get(name)) || null;
      }
      getAllCommands() {
        return {
          commands: this.bot.commands.map((x) => x),
          size: this.bot.commands.size
        }
      }
}