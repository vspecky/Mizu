const { RichEmbed } = require('discord.js');
let setsObj = require('../../Handlers/settings.js').settings;
let { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');

module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'You need to be in your custom VC to use this command.'
    }))

    message.member.voiceChannel.setUserLimit(message.member.voiceChannel.members.size);

    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `<@${message.author.id}>'s custom VC was locked.`
    }))

}

module.exports.config = {
    name: 'vclock',
    usage: "```.vclock```",
    desc: "Locks the command user's custom VC.",
    note: "Locking = setting the userlimit to the current amount of people in the VC."
}