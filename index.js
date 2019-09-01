const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
bot.usages = new Collection();
bot.prefixes = ['.'];
["commands", "events", "settings"].forEach(handler => require(`./Handlers/${handler}`)(bot));
bot.login(token);
module.exports.prefixadd = prefix => bot.prefixes.push(prefix);