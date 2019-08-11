const discord = require('discord.js');
const { vcinfo } = require('../../Events/Guild/voiceStateUpdate.js');

module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcinfo.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(`<@${message.author.id}> You need to be in your custom room to use this command.`)

    if(!args[0]) return message.channel.send(`<@${message.author.id}> Please specify a new name.`);

    let name = args.join(' ');

    message.guild.channels.find('id', vChannelID).setName(`${name}`);

    return message.channel.send(`<@${message.author.id}> The name of your custom room was changed successfully!`);

}

module.exports.help = {
    name: 'vcname'
}