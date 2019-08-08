const discord = require('discord.js');
const vcmap = require('F:\\BotCode\\Jun\\index.js');

module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcmap.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(`<@${message.author.id}> You need to be in your custom room to use this command.`)

    message.member.voiceChannel.setUserLimit(message.member.voiceChannel.members.size);

    return message.react(`☑`);

}

module.exports.help = {
    name: 'vclock'
}