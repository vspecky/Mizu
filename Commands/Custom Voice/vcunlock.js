const discord = require('discord.js');
const { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');

module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(`<@${message.author.id}> You need to be in your custom room to use this command.`)

    message.member.voiceChannel.setUserLimit(0);

    return message.react(`☑`);

}

module.exports.help = {
    name: 'vcunlock'
}