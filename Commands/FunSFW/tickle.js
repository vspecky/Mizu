const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    let body = await neko.sfw.tickle();

    
    let tickleEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Tickle tickle tickle!`)
    .setImage(body.url);

    let sTickleEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} tickles themself! lol!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(tickleEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sTickleEmbed);
    if(wUser.id == Mizu.user.id) return message.channel.send(`<@${message.author.id}> can't touch this! :smirk:`);

    let uTickleEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} tickles ${wUser.user.tag}! Can they hold it in?!`)
    .setImage(body.url);

    return message.channel.send(uTickleEmbed);



}

module.exports.config = {
    name: "tickle",
    usage: "j!tickle || j!tickle @user"
}