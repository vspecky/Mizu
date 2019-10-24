const { RichEmbed } = require("discord.js");

module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;

    if(args.length) return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor));

    let Mizuicon = Mizu.user.displayAvatarURL;

    let Mizuembed = new discord.RichEmbed()
    .setDescription("Mizu Information")
    .setColor(settings.defaultEmbedColor)
    .setThumbnail(Mizuicon)
    .addField("Mizu Name :", Mizu.user.username)
    .addField("Created On :", Mizu.user.createdAt);

    return message.channel.send(Mizuembed);
}

module.exports.config = {
    name: "Mizuinfo",
    usage: ".Mizuinfo",
    desc: 'Displays info bout me!'
}