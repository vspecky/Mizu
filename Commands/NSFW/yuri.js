const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    if(!message.channel.nsfw) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let body = await neko.nsfw.yuri();
    
    let yuriEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`Enjoy your yuri!`)
    .setImage(body.url);

    return message.channel.send(yuriEmbed);
}

module.exports.config = {
    name: "yuri",
    usage: ".yuri",
    desc: 'Posts a yuri image.'
}