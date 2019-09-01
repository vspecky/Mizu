const { RichEmbed } = require("discord.js");
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async(bot,message,args) =>{

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || isNaN(args[0])) return message.reply(usageEmbed);

    message.channel.bulkDelete(args[0]).then(() =>{
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });

}

module.exports.config = {
    name: "purge",
    usage:"```.purge <Number>```",
    desc: "Deletes the specified amount of messages from the chat."
}