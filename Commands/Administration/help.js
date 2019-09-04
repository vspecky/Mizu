const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const command = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));

    if(!command) return message.reply(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'That command does not exist.'
    }));

    return message.channel.send(new RichEmbed(bot.usages.get(command.config.name)).setColor(settings.defaultEmbedColor));

}

module.exports.config = {
    name: 'help',
    usage: "```.help <CommandName>```",
    desc: "Shows the usage of the specified command."
}