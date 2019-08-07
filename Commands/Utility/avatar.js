const discord = require('discord.js');

module.exports.run = async (bot, message, args) =>{

    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!aUser){
        aUser = message.member;
    }


    let avatarEmbed = new discord.RichEmbed()
    .setTitle(`Avatar: ${aUser.nickname}`)
    .setColor(aUser.displayHexColor)
    .setImage(aUser.user.displayAvatarURL);

    return message.channel.send(avatarEmbed);

}

module.exports.help = {
    name: "avatar"
}