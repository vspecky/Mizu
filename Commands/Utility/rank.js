const { RichEmbed } = require("discord.js");
const mongoose = require('mongoose');
const expschema = require('../../models/expSchema.js');

module.exports.run = async(bot,message,args) =>{
   

    let xpUser;

    if(args[0]){
        xpUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!wUser) return message.channel.send("Invalid user argument.");
    }else{
        xpUser = message.member;
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


module.exports.config = {
    name: "xp",
    usage: "j!xp || j!xp @user"
}