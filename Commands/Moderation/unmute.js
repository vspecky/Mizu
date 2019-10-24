const { RichEmbed } = require("discord.js");


module.exports.run = async(Mizu, message, args) =>{

    if(!message.member.hasPermission("MUTE_MEMBERS")) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const toMute = message.guild.fetchMember(message.mentions.users.first() || args[0]);
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
    .setThumbnail(toMute.user.displayAvatarURL)
    .addField("Unmuted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Unmuted By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setFooter(new Date().toUTCString());

    const umChannel = message.guild.channels.get(settings.logChannels.muteChannel);
    
    if(umChannel) umChannel.send(unMuteEmbed);
}

module.exports.config = {
    name: "unmute",
    usage: ".unmute <@User/UserID>",
    desc: "Unmutes the specified user."
}