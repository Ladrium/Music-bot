const Command = require("../structures/Command");
module.exports = class Help extends Command {
    constructor(bot) {
        super(bot, {
            name: "play",
            category: "Music",
            cooldown: 5000
        })
    }
    async run({ guild, member }, ...query) {
        let player = this.bot.player.lavalink.get(guild.id);
        if(!player) player = await this.bot.player.lavalink.join({
            guild: guild.id,
            channel: member.voiceChannelID,
            host: this.bot.nodes.host
        }, {selfdeaf: true});
        const [song] = (await this.bot.getSong(query)).tracks
        player.play(song.track)
    }
};