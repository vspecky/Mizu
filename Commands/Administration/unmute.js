const { RichEmbed } = require("discord.js");
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async(bot, message, args) =>{

    if(!message.member.hasPermission("MUTE_MEMBERS")) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute || `${toMute}` == `${message.author}`) return message.channel.send("Invalid user argument.");  

    const muteRole = message.guild.roles.get(settings.muteRole);

    if(toMute.roles.has(muteRole.id)){
        toMute.removeRole(muteRole.id);
        const embed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setDescription(`<@${toMute.id}> has been unmuted from text and voice chat.`)
        message.channel.send(embed);
    }
    else{
        return message.channel.send("That user is not muted.");
    }

    const unMuteEmbed = new RichEmbed()
    .setDescription("User Unmute")
    .setColor(settings.defaultEmbedColor)
    .setThumbnail(umIcon)
    .addField("Unmuted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Unmuted By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setTimestamp();

    const umChannel = message.guild.channels.get(settings.logChannels.muteChannel);
    
    if(umChannel) umChannel.send(unMuteEmbed);
}

module.exports.config = {
    name: "unmute",
    usage: "```.unmute <@User/UserID>```",
    desc: "Unmutes the specified user."
}