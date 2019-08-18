const { token } = require("../tokenc.json");
const { Client, Collection } = require('discord.js');
const bot = new Client({ disableEveryone: true });
bot.commands = new Collection();
["commands", "events"].forEach(handler => require(`./Handlers/${handler}`)(bot));
<<<<<<< HEAD
bot.login(token);
=======
bot.login(process.env.BOT_TOKEN);
>>>>>>> c0f42e3ff62703f55208253868e303baf5d0783d
