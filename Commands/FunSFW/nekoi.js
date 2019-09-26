const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;
    const usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    const body = await neko.sfw.neko();
    
    let nekoEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`Neko Neko Nyaa~`)
    .setImage(body.url);

    return message.channel.send(nekoEmbed);

}

module.exports.config = {
    name: "nekoi",
    usage: "```.nekoi```",
    desc: 'Posts a cute neko image.'
}