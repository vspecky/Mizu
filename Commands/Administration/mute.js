const { RichEmbed } = require("discord.js");

const ms = require('ms');

module.exports.run = async(bot, message, args) => {

    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name));

    const settings = bot.sets || {};
    const muteRole = message.guild.roles.get(settings.muteRole);
    const mChannel = message.guild.channels.get(settings.logChannels.muteChannel);
    usageEmbed.setColor(settings.defaultEmbedColor);
    if(!muteRole) return message.reply(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: "The mute role for the guild doesn't exist."
    }));

    if(!message.member.hasPermission("MUTE_MEMBERS")) return;

    const toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute || `${toMute}` == `${message.author}`){
        return message.reply(usageEmbed);
    }

    if(toMute.hasPermission("MUTE_MEMBERS")) return message.reply(`Why u wanna mute Mod-sama? :pensive:`);

    let muteEmbed = new RichEmbed()
    .setDescription(`🔇 User Mute:`)
    .setColor("#8E5BC5")
    .setThumbnail(toMute.user.displayAvatarURL)
    .addField("Muted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Muted By :", `${message.author} ID: ${message.author.id}`)
    .setTimestamp();

    toMute.addRole(muteRole.id);

    if(args[1]) {
        if(ms(args[1])) {
            setTimeout(() => {
                toMute.removeRole(muteRole.id);
            }, ms(args[0]));

            muteEmbed.addField('Time:', `${ms(ms(args[1]), { long: true })}`);

            if(args[2]) {
                const mReason = args.slice(2).join(' ');
                muteEmbed.addField('Reason:', `${mReason}`);
            }

        } else {
            const mReason = args.slice(1).join(' ');
            muteEmbed.addField('Reason:', `${mReason}`);
        }
    }
    
    if(mChannel) mChannel.send(muteEmbed);
    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `${toMute.user.tag} has been muted.`
    }))

}

module.exports.config = {
    name: "mute",
    usage: "```.mute @User <time(optional)> <reason(optional)>```",
    note: 'Make sure a mute role has been set and it exists.',
    desc: 'Mutes the specified user with options.'
}