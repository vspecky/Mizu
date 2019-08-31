const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.pat();

    
    let patEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`*pat pat* <3`)
    .setImage(body.url);

    let sPatEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} pats themself.`)
    .setImage(body.url);

    let bPatEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} yay pats!!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(patEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sPatEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(bPatEmbed);

    let uPatEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} pats ${wUser.user.tag} <3`)
    .setImage(body.url);

    return message.channel.send(uPatEmbed);



}

module.exports.config = {
    name: "pat",
    usage: "j!pat || j!pat @user"
}