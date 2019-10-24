const { RichEmbed } = require('discord.js');
const ms = require('ms');
let repeatmap = new Map();

module.exports.run = async (Mizu, message, args) => {

    if(!message.member.hasPermission(['BAN_MEMBERS'])) return;

    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name).setColor(Mizu.sets.defaultEmbedColor));

    if(!args.length || args.length < 2 || !ms(args[0]) || Array.from(repeatmap.keys()).includes(message.author.id)) return message.reply(usageEmbed);

    let content = message.content.substring(message.content.indexOf(' ')).replace(/ +/, '');

    content = content.substring(content.indexOf(' ')).replace(/ +/, '');

    const repeatInterval = setInterval((msg) => {
        msg.channel.send(content);
    }, ms(args[0]), message);

    repeatmap.set(message.author.id, {
        interval: repeatInterval,
        torepeat: content,
        time: ms(ms(args[0]), { long: true })
    });

    const confirmationEmbed = new RichEmbed()
    .setColor(Mizu.sets.defaultEmbedColor)
    .setAuthor(`🔄Repeat Set`)
    .setTitle(`${message.author.tag}`)
    .addField('Content:', content)
    .addField('Interval:', `${ms(ms(args[0]), { long: true })}`)
    .setFooter(new Date().toUTCString());

    return message.channel.send(confirmationEmbed);

}

module.exports.intervals = () => repeatmap;

module.exports.config = {
    name: 'repeat',
    usage: ".repeat <TimeInterval> <Content>",
    desc: "Sets a message repeater over the specified interval"
}