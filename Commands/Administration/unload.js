const { RichEmbed } = require('discord.js');
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const command = bot.commands.get(args[0].toLowerCase()) || bot.aliases.get(args[0].toLowerCase());

    if(!command.config.name) return message.reply('That command does not exist or has been unloaded already.');
    
    message.reply(`The \`${command.config.name}\` command was unloaded.`);
    bot.unloaded.set(command.config.name, command);
    bot.commands.delete(command.config.name);

}

module.exports.config = {
    name: 'unload',
    usage: "```.unload <CommandName>```",
    desc: "Unloads the specified command, making it unusable until loaded again."
}