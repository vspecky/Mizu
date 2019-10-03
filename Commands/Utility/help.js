const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) => {

    settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const command = Mizu.commands.get(args[0]) || Mizu.commands.get(Mizu.aliases.get(args[0]));

    if(!command) return message.reply(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'That command does not exist.'
    }));

    return message.channel.send(new RichEmbed(Mizu.usages.get(command.config.name)).setColor(settings.defaultEmbedColor));

}

module.exports.config = {
    name: 'help',
    usage: "```.help <CommandName>```",
    desc: "Shows the usage of the specified command."
}