const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
['commands', 'aliases', 'usages', 'unloaded'].forEach(field => bot[field] = new Collection());
["commands", "events", "settings"].forEach(handler => require(`./Handlers/${handler}`)(bot));
bot.login(token);