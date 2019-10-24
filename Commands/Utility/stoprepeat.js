const { RichEmbed } = require('discord.js');
const repeatFunc = require('./repeat').intervals;

module.exports.run = async (Mizu, message, args) => {

    if(!message.member.hasPermission(['BAN_MEMBERS'])) return;

    if(args.length) return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(Mizu.sets.defaultEmbedColor));

    const repeaters = repeatFunc();

    if(!Array.from(repeaters.keys()).includes(message.author.id)) return message.reply(new RichEmbed({
        description: 'You do not have any repeaters set.',
        color: Mizu.sets.defaultEmbedColor
    }));

    const userRepeater = repeaters.get(message.author.id);

    const clearEmbed = new RichEmbed()
    .setColor(Mizu.sets.defaultEmbedColor)
    .setAuthor(`🚫Repeater Stopped`)
    .setTitle(message.author.tag)
    .addField('Content:', userRepeater.torepeat)
    .addField('Time:', userRepeater.time);

    clearInterval(userRepeater.interval);

    repeatFunc().delete(message.author.id);

    message.channel.send(clearEmbed);
}

module.exports.config = {
    name: 'stoprepeat',
    usage: ".stoprepeat",
    desc: "Stops the user's repeater (if they have set any)."
}