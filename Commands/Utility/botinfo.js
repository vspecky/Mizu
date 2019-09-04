const { RichEmbed } = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;

    if(args.length) return message.reply(new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor));

    let boticon = bot.user.displayAvatarURL;

    let botembed = new discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor(settings.defaultEmbedColor)
    .setThumbnail(boticon)
    .addField("Bot Name :", bot.user.username)
    .addField("Created On :", bot.user.createdAt);

    return message.channel.send(botembed);
}

module.exports.config = {
    name: "botinfo",
    usage: "```.botinfo```",
    desc: 'Displays info bout me!'
}