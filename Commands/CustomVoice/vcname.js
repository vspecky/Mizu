const { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');
const { RichEmbed } = require('discord.js');


module.exports.run = async (bot,message,args) =>{

    const vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(new RichEmbed({
        description: 'You need to be in a custom VC to use this command.',
        color: settings.defaultEmbedColor
    }));

    if(!args[0]) return message.reply(usageEmbed);

    const name = args.join(' ');

    message.guild.channels.find(vc => vc.id == vChannelID).setName(`${name}`);

    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `The name of <@${message.author.id}>'s custom VC was changed to ${name}.`
    }));

}

module.exports.config = {
    name: 'vcname',
    usage: "```.vcname <NewName>```",
    desc: 'Changes the name of the command user\'s custom VC.',
}