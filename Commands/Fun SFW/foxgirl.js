const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let body = await neko.sfw.foxGirl();
    
    let foxGirlEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`Cute Foxgirl!`)
    .setImage(body.url);

    return message.channel.send(foxGirlEmbed);
}

module.exports.config = {
    name: "foxgirl",
    usage: "```.foxgirl```",
    desc: 'Posts an image/gif of a foxgirl.'
}