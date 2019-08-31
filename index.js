const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
["commands", "events"].forEach(handler => require(`./Handlers/${handler}`)(bot));
require('./Handlers/settings.js')();
bot.login(token);