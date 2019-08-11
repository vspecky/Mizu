const { RichEmbed } = require('discord.js');

module.exports = async (bot, message) => {

    let logch = message.guild.channels.find(`name`, "moderation");
    if (!logch) return message.channel.send("Couldn't find channel for msg delete logs");

    let dUser = message.member;
    let dIcon = dUser.user.displayAvatarURL;

    let preslice = message.content.split(" ");
    let prefix = preslice[0].slice(0, 2);

    if (prefix === "j!") return;

    let logEmbed = new RichEmbed()
        .setColor("#8E5BC5")
        .setDescription("Deleted Message")
        .setThumbnail(dIcon)
        .addField("Deleted Message :", message)
        .addField("By User :", `<@${dUser.id}>`)
        .setFooter(message.createdAt)
        .addField("In Channel :", message.channel);

    logch.send(logEmbed);

}