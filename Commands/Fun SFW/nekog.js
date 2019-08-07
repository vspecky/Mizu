const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.nekoGif();

    
    let nekoEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setDescription(`Neko Neko Nyaa~`)
    .setImage(body.url);


    return message.channel.send(nekoEmbed);


}

module.exports.help = {
    name: "nekog",
    usage: "j!nekog"
}