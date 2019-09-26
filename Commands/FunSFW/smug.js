const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;

    let body = await neko.sfw.smug();
    
    let smugEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser || message.author.id == wUser.id) return message.channel.send(smugEmbed.setTitle(`${message.author.tag} makes a smug face. 😏`));
    if(wUser.id == bot.user.id) return message.channel.send(smugEmbed.setTitle(`${message.author.tag} I see you you cheeky lil' troublemaker!`));
    return message.channel.send(smugEmbed.setTitle(`${message.author.tag} looks at ${wUser.user.tag} with a smug face. 😏`));
}

module.exports.config = {
    name: "smug",
    usage: "```.smug <@User(optional)>```",
    desc: 'Posts a smug image/gif.'
}