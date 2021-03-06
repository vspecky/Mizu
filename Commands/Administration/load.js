const { RichEmbed } = require('discord.js');


module.exports.run = async (Mizu, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args.length || args.length > 1) return message.reply(usageEmbed);

    const command = Mizu.commands.get(args[0].toLowerCase()) || Mizu.commands.get(Mizu.aliases.get(args[0].toLowerCase()));

    if(!Mizu.commands.has(args[0].toLowerCase()) && !Mizu.commands.has(Mizu.aliases.get(args[0].toLowerCase()))) return message.channel.send(new RichEmbed({
        description: 'That command does not exist or is functional already.',
        color: settings.defaultEmbedColor
    }));
    
    message.channel.send(new RichEmbed({
        description: `The \`${command.config.name}\` command was loaded.`,
        color: settings.defaultEmbedColor
    }));
    Mizu.commands.get(command.config.name).config.enabled = true;

}

module.exports.config = {
    name: 'load',
    usage: ".load <CommandName>",
    desc: "Loads the specified command, making it usable again."
}