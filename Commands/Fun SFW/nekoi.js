const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.neko();

    
    let nekoEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Neko Neko Nyaa~`)
    .setImage(body.url);


    return message.channel.send(nekoEmbed);


}

module.exports.config = {
    name: "nekoi",
    usage: "j!nekoi"
}