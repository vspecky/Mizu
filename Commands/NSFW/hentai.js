const discord = require("discord.js");
const nekos = require("nekos.life");
const fs = require("fs");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    if(message.channel.parentID != category.nsfw) return;


    let body = await neko.nsfw.hentai();

    
    let hentaiEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Enjoy your hentai!`)
    .setImage(body.url);


    return message.channel.send(hentaiEmbed);


}

module.exports.config = {
    name: "hentai",
    usage: "j!hentai"
}