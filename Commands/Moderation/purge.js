const { RichEmbed } = require("discord.js");


module.exports.run = async(bot,message,args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || isNaN(args[0])) return message.reply(usageEmbed);

    message.channel.bulkDelete(args[0]).then(() =>{
        message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: `Cleared ${args[0]} messages.`
        })).then(msg => msg.delete(5000));
    });

}

module.exports.config = {
    name: "purge",
    usage:"```.purge <Number>```",
    desc: "Deletes the specified amount of messages from the chat."
}