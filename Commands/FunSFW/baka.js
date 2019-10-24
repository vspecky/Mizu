const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    let body = await neko.sfw.baka();

    const settings = Mizu.sets;

    let bakaEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(bakaEmbed.setTitle('Baka!!'));
    if(message.author.id == wUser.id) return message.channel.send(bakaEmbed.setTitle(`${message.author.tag} calls themself a baka!`));
    if(wUser.id == Mizu.user.id) return message.channel.send(bakaEmbed.setTitle(`${message.author.tag} No u!`));
    return message.channel.send(bakaEmbed.setTitle(`${message.author.tag} calls ${wUser.user.tag} a baka!!`));

}

module.exports.config = {
    name: "baka",
    usage: ".baka <@User(optional)>",
    desc: "Posts a 'baka' themed image/gif"
}