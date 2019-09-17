const { RichEmbed } = require("discord.js"); 

module.exports.run = async(bot, message, args) =>{
     // j!kick @user reason

    if(!message.member.hasPermission("KICK_MEMBERS")) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !args[1]) return message.reply(usageEmbed);

    const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser || `${kUser}` == `${message.author}`) return message.channel.send(new RichEmbed({
        description: 'You cannot kick non-existent members or yourself.',
        color: settings.defaultEmbedColor
    }));

    if(kUser.hasPermission("KICK_MEMBERS")) return message.reply(`Why u wanna kick Mod-sama? :pensive:`);
     
    const kReason = args.slice(1).join(' ');
    if(!kReason) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'Please specify a reason.'
    }));

    const kickEmbed = new RichEmbed()
     .setDescription("User Kick")
     .setColor(settings.embCols.kickEmbedColor)
     .setFooter(new Date().toUTCString())
     .setThumbnail(kUser.user.displayAvatarURL)
     .addField("Kicked User :", `<@${kUser}> ID: ${kUser.id}`)
     .addField("Kicked By :", `${message.author} ID: ${message.author.id}`)
     .addField("Reason :", kReason);

    const kChannel = message.guild.channels.get(settings.logChannels.kickChannel);

    message.guild.member(kUser).kick(kReason);
     
    if(kChannel) kChannel.send(kickEmbed);
}


module.exports.config = {
    name: "kick",
    usage: "```.kick <@User/UserID> <Reason>```",
    desc: 'Kicks the specified user for the specified reason.',
    note: 'Make sure a kick logs channel has been set to acquire the logs.'
}