const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

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
    usage: ".foxgirl",
    desc: 'Posts an image/gif of a foxgirl.'
}