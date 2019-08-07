const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.kemonomimi();

    
    let kemonomimiEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setDescription(`Here's your kawaii kemonomimi!`)
    .setImage(body.url);


    return message.channel.send(kemonomimiEmbed);


}

module.exports.help = {
    name: "kemonomimi",
    usage: "j!kemonomimi"
}