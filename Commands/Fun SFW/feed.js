const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.feed();

    
    let feedEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Food!`)
    .setImage(body.url);

    let sFeedEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} feeds themself. Yum!`)
    .setImage(body.url);

    let specFeedEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("Om nom nom nom~")
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(feedEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sFeedEmbed);
    if(message.author.id == 375922007969366016 && wUser.id == bot.user.id) return message.channel.send(specFeedEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(`<@${message.author.id}> No! Only Spec may feed me!`);
    


    let uFeedEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} feeds ${wUser.user.tag}. Cute!`)
    .setImage(body.url);

    return message.channel.send(uFeedEmbed);



}

module.exports.help = {
    name: "feed",
    usage: "j!feed || j!feed @user"
}