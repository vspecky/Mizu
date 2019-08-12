const fs = require('fs');
const botprefix = require("../../JSON/prefixc.json");
let cooldown = new Set();
let xp = JSON.parse(fs.readFileSync("./JSON/xp.json", "utf8"));

module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (!cooldown.has(message.author.id) && message.author.id != bot.user.id) {
        cooldown.add(message.author.id);

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                txp: 0,
                lvl: 1,
                nlxp: 0
            };
        }

        let xpAdd = Math.floor(Math.random() * 6) + 10;
        xp[message.author.id].txp += xpAdd;
        xp[message.author.id].nlxp += xpAdd;
        let nxtlvl = xp[message.author.id].lvl * 50;

        if (nxtlvl <= xp[message.author.id].nlxp) {
            xp[message.author.id].lvl += 1;
            xp[message.author.id].nlxp = 0;
        }

        fs.writeFile('./JSON/xp.json', JSON.stringify(xp), (err) => {
            if (err) console.log(err);
        });

    }

    let prefix = botprefix.prefix;
    let messageArray = message.content.split(/ +/g);
    let cmd = messageArray[0].slice(prefix.length).toLowerCase();
    let args = messageArray.slice(1);


    let commandFile = bot.commands.get(cmd);

    if (commandFile) {
        commandFile.run(bot, message, args);
    }

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 60000);

}