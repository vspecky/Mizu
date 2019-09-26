const { RichEmbed } = require('discord.js');

let { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');

module.exports.run = async (bot,message,args) =>{

    const vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'You need to be in your custom VC to use this command.'
    }));

    if(!args[0]) return message.reply(usageEmbed);

    if(isNaN(args[0]) || args[0] > 99 || args[0] < 1) return message.reply(usageEmbed);

    message.guild.channels.find(vc => vc.id == vChannelID).setUserLimit(args[0]);

    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `The userlimit for <@${message.author.id}>'s custom VC was set to ${args[0]}.`
    }));

}

module.exports.config = {
    name: 'vclimit',
    usage: "```.vclimit <Number>```",
    desc: 'Sets a userlimit for a custom VC from 1-99 depending on the amount specified.',
    note: 'Limit argument should be in the range 1-99 (Including 1 and 99).'
}