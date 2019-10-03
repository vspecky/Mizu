const { RichEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports.run = async(Mizu,message,args) =>{

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed)

    let image = await fetch(`http://aws.random.cat/meow`).then(res => res.json());

    let catEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle("Kitty! :cat:")
    .setImage(image.file);

    return message.channel.send(catEmbed);

}

module.exports.config = {
    name: "kitty",
    usage: "```.kitty```",
    desc: "Posts an image of a cat."
}