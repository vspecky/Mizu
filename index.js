const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
["commands", "events"].forEach(handler => require(`./Handlers/${handler}`)(bot));
bot.login(token);
