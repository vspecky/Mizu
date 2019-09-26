const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.kiss();
    
    const settings = bot.sets;
    
    let kissEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(kissEmbed.setTitle('Chuuu!~'));
    if(message.author.id == wUser.id) return message.channel.send(kissEmbed.setTitle(`${message.author.tag} kisses themself! Dunno how that works :/`));
    if(wUser.id == bot.user.id) return message.channel.send(kissEmbed.setTitle('*dodge*. Have a kiss gif anyway :p'));

    return message.channel.send(uKissEmbed.setTitle(`${message.author.tag} kisses ${wUser.user.tag}. How sweet! <3`));
}

module.exports.config = {
    name: "kiss",
    usage: "```.kiss <@User(optional)>```",
    desc: 'Posts a kiss image/gif.'
}