const discord = require("discord.js");
const nekos = require("nekos.life");
const fs = require("fs");
const neko = new nekos();
const category = JSON.parse(fs.readFileSync("./JSON/logchannels.json", "utf8"));

module.exports.run = async(bot, message, args) =>{

    if(message.channel.parentID != category.nsfw) return;


    let body = await neko.nsfw.neko();

    
    let nekohEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Enjoy your neko!`)
    .setImage(body.url);


    return message.channel.send(nekohEmbed);


}

module.exports.config = {
    name: "nekoh",
    usage: "j!nekoh"
}