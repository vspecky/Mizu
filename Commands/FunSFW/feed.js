const { RichEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(Mizu, message, args) =>{

    let body = await neko.sfw.feed();

    const settings = Mizu.sets;
    
    let feedEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(feedEmbed.setTitle('Food!'));
    if(message.author.id == wUser.id) return message.channel.send(feedEmbed.setTitle(`${message.author.tag} feeds themself. Yum!`));
    if(wUser.id == Mizu.user.id) return message.channel.send(feedEmbed.setTitle("Om nom nom nom~"));
    return message.channel.send(feedEmbed.setTitle(`${message.author.tag} feeds ${wUser.user.tag}. Cute!`));
}

module.exports.config = {
    name: "feed",
    usage: "```.feed <@User(optional)>```",
    desc: 'Posts an image/gif about food.'
}