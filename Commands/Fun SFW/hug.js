const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.hug();

    
    let hugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`*Hug* <3`)
    .setImage(body.url);

    let sHugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} hugs themself in loneliness :(`)
    .setImage(body.url);

    let specHugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("Yay! ily Spec~ <3")
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(hugEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sHugEmbed);
    if(message.author.id == 375922007969366016 && wUser.id == bot.user.id) return message.channel.send(specHugEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(`<@${message.author.id}> No! Only Spec may hug me!`);
    


    let uHugEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} hugs ${wUser.user.tag}. How sweet! <3`)
    .setImage(body.url);

    return message.channel.send(uHugEmbed);



}

module.exports.help = {
    name: "hug",
    usage: "j!hug || j!hug @user"
}