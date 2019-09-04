const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let body = await neko.sfw.kemonomimi();
    
    let kemonomimiEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setDescription(`Here's your kawaii kemonomimi!`)
    .setImage(body.url);

    return message.channel.send(kemonomimiEmbed);

}

module.exports.config = {
    name: "kemonomimi",
    usage: "```.kemonomimi```",
    desc: 'Posts a kemonomimi image/gif.'
}