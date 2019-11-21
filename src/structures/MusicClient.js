const { Client, Collection } = require("discord.js"); // npm i discord.js
const { PlayerManager } = require("discord.js-lavalink"); // npm i discord.js-lavalink 
const YouTube = require("simple-youtube-api"); // npm i simple-youtube-api
const fetch = require("node-fetch");

const Queue = require("./Queue");
const { nodes, key } = require("../../config");
const youtube = new YouTube(key);
const [node] = nodes;

module.exports = class MusicClient extends Client {
    constructor(options) {
        super(options);
        this.aliases = new Collection();
        this.commands = new Collection();
        this.handler = null;
        this.player = {
            Queue
        };
        this.nodes = node;
        this.once("ready", () => {
            console.log(this.user.username + " is ready to go!")
            this._init();
        });
    }
    _init() {
        this.player.lavalink = new PlayerManager(this, nodes, {
            user: this.user.id,
            shards: 0
        });
    }
    async getSong(query = "Music") {
        return new Promise((resolve, reject) => {
            fetch(`http://${node.host}:${node.port}/loadtracks?identifier=ytsearch%3A${encodeURIComponent(query)}`,
                { headers: { Authorization: node.password } })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }
}