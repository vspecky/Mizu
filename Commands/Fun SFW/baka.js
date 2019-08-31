const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.baka();

    
    let bakaEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Baka!!`)
    .setImage(body.url);

    let sBakaEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} calls themself a baka!`)
    .setImage(body.url);

    let bBakaEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} No u!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(bakaEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sBakaEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(bBakaEmbed);

    let uBakaEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} calls ${wUser.user.tag} a baka!!`)
    .setImage(body.url);

    return message.channel.send(uBakaEmbed);



}

module.exports.config = {
    name: "baka",
    usage: "j!baka || j!baka @user"
}