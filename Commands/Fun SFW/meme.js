const { RichEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async(bot,message,args) =>{

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    const meme = await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json());

    const memeEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle("Here's your meme, served fresh!")
    .setImage(meme.url);

    return message.channel.send(memeEmbed);
}

module.exports.config = {
    name: "meme",
    usage: "```.meme```",
    desc: "Posts a dank meme."
}