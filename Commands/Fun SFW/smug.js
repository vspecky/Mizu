const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{


    let body = await neko.sfw.smug();

    
    let smugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} makes a smug face. 😏`)
    .setImage(body.url);

    let bSmugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} I see you you cheeky lil' troublemaker!`)
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser || message.author.id == wUser.id) return message.channel.send(smugEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(bSmugEmbed);

    let uSmugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} looks at ${wUser.user.tag} with a smug face. 😏`)
    .setImage(body.url);

    return message.channel.send(uSmugEmbed);



}

module.exports.config = {
    name: "smug",
    usage: "j!smug || j!smug @user"
}