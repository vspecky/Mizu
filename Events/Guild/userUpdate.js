const { RichEmbed } = require('discord.js');

module.exports = async (bot, oldUser, newUser) => {

    if(oldUser.displayAvatarURL !== newUser.displayAvatarURL) sendAvatarUpdateEmbed(oldUser, newUser, bot);
    if(oldUser.tag !== newUser.tag) sendTagUpdateEmbed(oldUser, newUser, bot);

}

const sendAvatarUpdateEmbed = (olduser, newuser, bot) => {

    let avatarUpdateEmbed = new RichEmbed()
    .setColor(bot.sets.defaultEmbedColor)
    .setThumbnail(olduser.displayAvatarURL)
    .setImage(`${newuser.displayAvatarURL}?size=128`)
    .setTitle(`👦Avatar Update:`)
    .setDescription(`${newuser.tag} (ID: ${newuser.id})`)
    .setFooter(new Date().toUTCString());

    const channel = bot.channels.get(bot.sets.logChannels.userupdateChannel);

    if(channel) channel.send(avatarUpdateEmbed);

}

const sendTagUpdateEmbed = (olduser, newuser, bot) => {

    let tagUpdateEmbed = new RichEmbed()
    .setColor(bot.sets.defaultEmbedColor)
    .setTitle(`🏷Username Update:`)
    .setDescription(`**New Username:** ${newuser.tag}\n**Old Username:** ${olduser.tag}\n(ID: ${newuser.id})`)
    .setFooter(new Date().toUTCString());

    const channel = bot.channels.get(bot.sets.logChannels.userupdateChannel);

    if(channel) channel.send(tagUpdateEmbed);

}