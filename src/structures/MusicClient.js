const { Client, Collection } = require("discord.js");
const Queue = require("./Queue");
const { PlayerManager } = require("discord.js-lavalink")
const { nodes } = require("../config");

module.exports = class MusicClient extends Client {
    constructor(options) {
        super(options);
        this.aliases = new Collection();
        this.commands = new Collection();
        this.handler = null;
        this.player = {
            Queue
        };

        this.once("ready", () => {
            console.log(this.user.username + " is ready to go!")
            this._init();
        });
    }
    static _init() {
        this.player.lavalink = new PlayerManager(this, nodes, {
            user: this.user.id,
            shards: 0
        });
    }
}