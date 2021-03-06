const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    if(!message.channel.nsfw) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let body = await neko.nsfw.neko();
    
    let nekohEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`Enjoy your neko!`)
    .setImage(body.url);

    return message.channel.send(nekohEmbed);
}

module.exports.config = {
    name: "nekoh",
    usage: ".nekoh",
    desc: 'Posts a lewd nekomimi image.'
}