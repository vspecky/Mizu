const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.foxGirl();

    
    let foxGirlEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setDescription(`Cute Foxgirl!`)
    .setImage(body.url);


    return message.channel.send(foxGirlEmbed);


}

module.exports.config = {
    name: "foxgirl",
    usage: "j!foxgirl"
}