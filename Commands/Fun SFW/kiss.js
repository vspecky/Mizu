const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(bot, message, args) =>{

    let body = await neko.sfw.kiss();

    
    let kissEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`*Kiss* <3`)
    .setImage(body.url);

    let sKissEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} kisses themself! Dunno how that works :/`)
    .setImage(body.url);

    let specKissEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("mmph! I love you Spec~ <3")
    .setImage(body.url);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(kissEmbed);
    if(message.author.id == wUser.id) return message.channel.send(sKissEmbed);
    if(message.author.id == 375922007969366016 && wUser.id == bot.user.id) return message.channel.send(specKissEmbed);
    if(wUser.id == bot.user.id) return message.channel.send(`<@${message.author.id}> No! Only Spec may kiss me!`);
    


    let uKissEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`${message.author.tag} kisses ${wUser.user.tag}. How sweet! <3`)
    .setImage(body.url);

    return message.channel.send(uKissEmbed);



}

module.exports.config = {
    name: "kiss",
    usage: "j!kiss || j!kiss @user"
}