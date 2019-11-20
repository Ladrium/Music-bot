
const prefix = "!"
const Cooldowns = new Set();

module.exports = async (bot, message) => {
	if (!message.guild) return;
	if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message.author);
	if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the permission: Administrator !!");
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command;
	try {
		if (Cooldowns.has(message.author.id)) return message.reply("Slow down buddy!");
		command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if (command) {
			await command.run(message, args);
			if (command.cooldown) {
				Cooldowns.add(message.author.id);
				setTimeout(() => {
					Cooldowns.delete(message.author.id);
				}, command.cooldown);
			}
		}
	}
	catch (e) {
		console.log(e);
	}
}