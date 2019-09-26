const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(['ADMINISTRATOR'])) return;

    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(bot.sets.defaultEmbedColor);

    if(!args.length || args.length > 2) return message.reply(usageEmbed);

    const keys = Object.keys(bot.modules);

    if(!keys.includes(args[0])) {
        let infostr = '';
        let i = 0;

        keys.forEach(mod => {
            infostr += `${i + 1}. **${mod}**\n`;
            i++;
        });

        return message.channel.send(new RichEmbed({
            title: 'List of Modules :',
            description: infostr,
            color: bot.sets.defaultEmbedColor
        }));
        
    } else {
        bot.modules[args[0]] = false;

        return message.channel.send(new RichEmbed({
            description: `The '${args[0]}' module was unloaded.`,
            color: bot.sets.defaultEmbedColor
        }));
    }

}

module.exports.config = {
    name: "modunload",
    usage: "```.modunload <ModuleName>```",
    desc: "Unloads all commands in the specified module."
}