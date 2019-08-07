const discord = require("discord.js");
const fs = require("fs");
let xp = JSON.parse(fs.readFileSync("./JSON/xp.json", "utf8"));

module.exports.run = async(bot,message,args) =>{
   

    let xpUser;

    if(!args[0]){
        xpUser = message.guild.member(message.author.id);
    }
    else{
        xpUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    }



    let xpEmbed = new discord.RichEmbed()
    .setColor(message.member.displayHexColor)
    .setTitle(`XP Stats: ${xpUser.user.tag}`)
    .setThumbnail(`${xpUser.user.displayAvatarURL}`)
    .addField('Level:', xp[xpUser.user.id].lvl, true)
    .addField('Current XP:', `${xp[xpUser.user.id].nlxp}/${xp[xpUser.user.id].lvl * 50}`, true)
    .addField('Total XP:', xp[xpUser.user.id].txp, true);


    return message.channel.send(xpEmbed);


}


module.exports.help = {
    name: "xp",
    usage: "j!xp || j!xp @user"
}