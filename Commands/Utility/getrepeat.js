const { RichEmbed } = require('discord.js');
const repeatFunc = require('./repeat.js').intervals;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(['BAN_MEMBERS'])) return;

    const repeats = repeatFunc();

    if(args.length) return message.reply(new RichEmbed(bot.usages.get(exports.config.name)).setColor(bot.sets.defaultEmbedColor));

    if(!Array.from(repeats.keys()).includes(message.author.id)) return message.reply(new RichEmbed({
        description: 'You do not have any repeaters set.',
        color: bot.sets.defaultEmbedColor
    }));

    const repeater = repeats.get(message.author.id)

    let repeatEmbed = new RichEmbed()
    .setColor(bot.sets.defaultEmbedColor)
    .setTitle(`Repeater: ${message.author.tag}`)
    .addField('Content:', repeater.torepeat)
    .addField('Interval:', repeater.time);

    message.channel.send(repeatEmbed);

}

module.exports.config = {
    name: 'getrepeat',
    usage: "```.getreapeat```",
    desc: "Displays information about the user's repeater, if they have set one."
}