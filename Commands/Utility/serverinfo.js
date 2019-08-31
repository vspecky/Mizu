const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
    let servicon = message.guild.iconURL;

        let serverembed = new discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#8E5BC5")
        .setThumbnail(servicon)
        .addField("Server Name :", message.guild.name)
        .addField("Created On :", message.guild.createdAt)
        .addField("You Joined On :", message.member.joinedAt)
        .addField("Total Members :", message.guild.memberCount);

        return message.channel.send(serverembed);

}

module.exports.config = {
    name: "serverinfo"
}