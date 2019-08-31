const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.slap();

    
    let slapEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`SLAP!!`)
    .setImage(body.url);

    let sSlapEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} slaps themself! Ouch!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(slapEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sSlapEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(`<@${message.author.id}> can't touch this! :smirk:`);

    let uSlapEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} slaps ${wUser.user.tag}. Ouch!!`)
    .setImage(body.url);

    return message.channel.send(uSlapEmbed);



}

module.exports.config = {
    name: "slap",
    usage: "j!slap || j!slap @user"
}