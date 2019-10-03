const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;

    const body = await neko.sfw.pat();
    
    let patEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(patEmbed.setTitle(`*pat pat* <3`));
    if(message.author.id == wUser.id) return message.channel.send(patEmbed.setTitle(`${message.author.tag} pats themself.`));
    if(wUser.id == Mizu.user.id) return message.channel.send(patEmbed.setTitle(`${message.author.tag} yay pats!!`));
    return message.channel.send(patEmbed.setTitle(`${message.author.tag} pats ${wUser.user.tag} <3`));
}

module.exports.config = {
    name: "pat",
    usage: "```.pat <@User(optional)>```",
    desc: 'Posts a patting image/gif.'
}