const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(Mizu, message, args) =>{

    let body = await neko.sfw.hug();

    const settings = Mizu.sets;

    let hugEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(hugEmbed.setTitle(`*Hug* <3`));
    if(message.author.id == wUser.id) return message.channel.send(hugEmbed.setTitle(`${message.author.tag} hugs themself in loneliness :(`));
    if(wUser.id == Mizu.user.id) return message.channel.send(hugEmbed.setTitle('Yay Hugs!!'));
    return message.channel.send(hugEmbed.setTitle(`${message.author.tag} hugs ${wUser.user.tag}. How sweet! <3`));
}

module.exports.config = {
    name: "hug",
    usage: "```.hug <@User(optional)>```",
    desc: "Posts a hug image/gif."
}