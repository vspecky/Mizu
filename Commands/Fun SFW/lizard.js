const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.lizard();

    
    let lizardEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setDescription(`Hisssss~`)
    .setImage(body.url);


    return message.channel.send(lizardEmbed);


}

module.exports.config = {
    name: "lizard",
    usage: "j!lizard"
}