const { RichEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async(bot,message,args) =>{
    
    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);
    
    const image = await fetch("https://random.dog/woof.json").then(res => res.json());

    let dogEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle("Doggo :dog:")
    .setImage(image.url);

    return message.channel.send(dogEmbed);
}

module.exports.config = {
    name: "doggo",
    usage: '```.doggo```',
    desc: "Posts a dog picture."
}