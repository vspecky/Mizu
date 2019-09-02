const { RichEmbed } = require('discord.js');
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const command = bot.unloaded.get(args[0].toLowerCase());

    if(!command.config.name) return message.reply("That command doesn't exist or hasn't been unloaded.");
    
    message.reply(`The \`${command.config.name}\` command was loaded.`);
    bot.commands.set(command.config.name, command);
    bot.unloaded.delete(command.config.name);

}

module.exports.config = {
    name: 'load',
    usage: "```.load <CommandName>```",
    desc: "Loads the specified command, making it usable again."
}