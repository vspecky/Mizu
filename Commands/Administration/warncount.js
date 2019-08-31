const discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./JSON/warnings.json", "utf8"));


module.exports.run = async(bot, message, args) =>{

    // j!warncount @user
    let wUser;

    if(args[0]){
        wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!wUser) return message.channel.send("Invalid user argument.");
    }else{
        wUser = message.member;
    }

    

    if(!warns[wUser.id]) return message.channel.send(`The warn count of <@${wUser.id}> is 0.`);

    let wCount = warns[wUser.id].warns;

    message.channel.send(`The warn count of <@${wUser.id}> is ${wCount}.`);

    return;
}


module.exports.config = {
    name: "warncount"
}