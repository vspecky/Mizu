const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.poke();

    
    let pokeEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`*Poke*`)
    .setImage(body.url);

    let sPokeEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} pokes themself!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(pokeEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sPokeEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(`<@${message.author.id}> can't touch this! :smirk:`);

    let uPokeEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} pokes ${wUser.user.tag}. *poke*`)
    .setImage(body.url);

    return message.channel.send(uPokeEmbed);



}

module.exports.config = {
    name: "poke",
    usage: "j!poke || j!poke @user"
}