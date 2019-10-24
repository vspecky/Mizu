const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports.run = async (Mizu, message, args) =>{

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let fact = await fetch("https://uselessfacts.jsph.pl/random.json?language=en").then(res => res.json());

    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: fact.text
    }));

}

module.exports.config = {
    name: "fact",
    usage: ".fact",
    desc: 'Posts a random fact.'
}