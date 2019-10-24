const { RichEmbed } = require('discord.js');

let { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');

module.exports.run = async (Mizu,message,args) =>{

    const vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

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
    usage: ".vclock",
    desc: "Locks the command user's custom VC.",
    note: "Locking = setting the userlimit to the current amount of people in the VC."
}