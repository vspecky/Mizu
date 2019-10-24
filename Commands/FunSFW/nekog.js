const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;
    const usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    const body = await neko.sfw.nekoGif();
    
    let nekoEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`Neko Neko Nyaa~`)
    .setImage(body.url);

    return message.channel.send(nekoEmbed);
}

module.exports.config = {
    name: "nekog",
    usage: ".nekog",
    desc: 'Posts a neko gif.'
}