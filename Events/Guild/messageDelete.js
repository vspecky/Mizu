const { RichEmbed } = require('discord.js');

module.exports = async (Mizu, message) => {

    const settings = Mizu.sets;

    const logch = message.guild.channels.get(settings.logChannels.msgdelChannel);

    const dUser = message.member;
    const dIcon = dUser.user.displayAvatarURL;

    let logEmbed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setDescription("Deleted Message")
        .setThumbnail(dIcon)
        .addField("Deleted Message :", message)
        .addField("By User :", `<@${dUser.id}>`)
        .setFooter(new Date().toUTCString())
        .addField("In Channel :", message.channel);

    if(logch) return logch.send(logEmbed);

}