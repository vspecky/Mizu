const discord = require('discord.js');
const vcmap = require('F:\\BotCode\\Jun\\index.js');

module.exports.run = async (bot,message,args) =>{

    let vChannelID = vcmap.vcPerks.get(`${message.author.id}`);

    if(!vChannelID) return;

    if(message.member.voiceChannelID != vChannelID) return message.channel.send(`<@${message.author.id}> You need to be in your custom room to use this command.`)

    if(!args[0]) return message.channel.send(`<@${message.author.id}> Please specify a new limit.`);

    if(isNaN(args[0])) return message.channel.send(`<@${message.author.id}> Please specify a number.`);

    if(args[0] > 99 || args[0] < 1) return message.channel.send(`<@${message.author.id}> Please specify a number between 1 and 99.`)

    message.guild.channels.find('id', vChannelID).setUserLimit(args[0]);

    return message.channel.send(`<@${message.author.id}> The user limit of your custom room was changed to ${args[0]}.`);

}

module.exports.help = {
    name: 'vclimit'
}