const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
bot.aliases = new Collection();
["commands", "events"].forEach(handler => require(`./Handlers/${handler}`)(bot));
<<<<<<< HEAD
require('./Handlers/settings.js')();
bot.login(token);
=======
bot.login(token);
>>>>>>> 2eca6f29f3b1f2a8ec64c25d65f334460af29105
