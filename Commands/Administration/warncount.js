const discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./JSON/warnings.json", "utf8"));


module.exports.run = async(bot, message, args) =>{

    // j!warncount @user

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send("Invalid user argument.");

    if(!warns[wUser.id]) return message.channel.send(`The warn count of <@${wUser.id}> is 0.`);

    let wCount = warns[wUser.id].warns;

    message.channel.send(`The warn count of <@${wUser.id}> is ${wCount}.`);

    return;
}


module.exports.help = {
    name: "warncount"
}