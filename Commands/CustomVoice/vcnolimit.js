const { RichEmbed } = require('discord.js');
const { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');


module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(new RichEmbed({
        description: 'You need to be in your custom VC to use this command.',
        color: settings.defaultEmbedColor
    }));

    if(message.member.voiceChannel.userLimit != 0) message.member.voiceChannel.setUserLimit(0);
    else return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'Your channel already has no userlimit'
    }));

    return message.channel.send(new RichEmbed({
        description: `The userlimit for <@${message.author.id}>'s custom VC was removed.`
    }));

}

module.exports.config = {
    name: 'vcnolimit',
    usage: "```.vcnolimit```",
    desc: 'Removes the user limit on the command user\'s custom VC.'
}