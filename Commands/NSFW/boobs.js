const { RichEmbed } = require("discord.js");

module.exports.run = async(bot,message,args) =>{

    if(!message.channel.nsfw) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let imgNo = Math.ceil(Math.random() * 13990);

    let imgQuery = imgNo.toString();

    while(imgQuery.length < 5){
        imgQuery = '0' + imgQuery;
    }

    let boobEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle('Enjoy the boobs!')
    .setImage(`http://media.oboobs.ru/boobs_preview/${imgQuery}.jpg`)

    message.channel.send(boobEmbed);    
}


module.exports.config = {
    name: "boobs",
    usage: "```.boobs```",
    desc: 'Posts an image with boobs.'
}