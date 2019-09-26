const { RichEmbed } = require('discord.js');
const ms = require('ms');
let repeatmap = new Map();

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(['BAN_MEMBERS'])) return;

    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name).setColor(bot.sets.defaultEmbedColor));

    if(!args.length || args.length < 2 || !ms(args[0]) || Array.from(repeatmap.keys()).includes(message.author.id)) return message.reply(usageEmbed);

    let content = message.content.substring(message.content.indexOf(' ')).replace(/ +/, '');

    content = content.substring(content.indexOf(' ')).replace(/ +/, '');

    const repeatInterval = setInterval((msg) => {
        msg.channel.send(content);
    }, ms(args[0]), message);

    repeatmap.set(message.author.id, repeatInterval);

    const confirmationEmbed = new RichEmbed()
    .setColor(bot.sets.defaultEmbedColor)
    .setTitle(`Repeating Content`)
    .setDescription(`${content}`)
    .setFooter(`User: ${message.author.username} (ID: ${message.author.id})`);

    return message.channel.send(confirmationEmbed);

}

module.exports.config = {
    name: 'repeat',
    usage: "```.repeat <TimeInterval> <Content>```"
}