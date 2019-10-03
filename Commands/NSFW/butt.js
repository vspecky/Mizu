const { RichEmbed } = require("discord.js");

module.exports.run = async(Mizu,message,args) =>{

    if(!message.channel.nsfw) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(args.length) return message.reply(usageEmbed);

    let imgNo = Math.ceil(Math.random() * 6730);

    let imgQuery = imgNo.toString();

    while(imgQuery.length < 5){
        imgQuery = '0' + imgQuery;
    }

    let buttEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle('Enjoy the butt!')
    .setImage(`http://media.obutts.ru/butts_preview/${imgQuery}.jpg`)

    message.channel.send(buttEmbed);

}


module.exports.config = {
    name: "butt",
    usage: "```.butt```",
    desc: 'Posts an image with a butt.'
}