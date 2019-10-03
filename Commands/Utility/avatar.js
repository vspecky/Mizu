const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) =>{

    const aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) || message.member;

    let avatarEmbed = new RichEmbed()
    .setTitle(`Avatar: ${aUser.nickname}`)
    .setColor(aUser.displayHexColor)
    .setImage(aUser.user.displayAvatarURL);

    return message.channel.send(avatarEmbed);
}

module.exports.config = {
    name: "avatar",
    usage: "```.avatar <@User(optional)>```",
    desc: 'Posts the avatar of the specified user or the command user.'
}