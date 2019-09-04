const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    if(!message.channel.nsfw) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let body = await neko.nsfw.hentai();
    
    let hentaiEmbed = new discord.RichEmbed()
    .setColor(setting.defaultEmbedColor)
    .setTitle(`Enjoy your hentai!`)
    .setImage(body.url);

    return message.channel.send(hentaiEmbed);
}

module.exports.config = {
    name: "hentai",
    usage: "```.hentai```",
    desc: 'Posts a hentai image.'
}