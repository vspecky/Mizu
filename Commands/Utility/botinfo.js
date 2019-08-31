const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
    let boticon = bot.user.displayAvatarURL;

        let botembed = new discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#8E5BC5")
        .setThumbnail(boticon)
        .addField("Bot Name :", bot.user.username)
        .addField("Created On :", bot.user.createdAt);

        return message.channel.send(botembed);

}

module.exports.config = {
    name: "botinfo"
}