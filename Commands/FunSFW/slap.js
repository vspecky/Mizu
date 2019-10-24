const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();

module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;
    const usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    const body = await neko.sfw.slap();
 
    let slapEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setImage(body.url);

    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(slapEmbed.setTitle('SLAP!!'));
    if(message.author.id == wUser.id) return message.channel.send(slapEmbed.setTitle(`${message.author.tag} slaps themself! Ouch!`));
    if(wUser.id == Mizu.user.id) return message.channel.send(`<@${message.author.id}> can't touch this! :smirk:`);
    return message.channel.send(slapEmbed.setTitle(`${message.author.tag} slaps ${wUser.user.tag}. Ouch!!`));
}

module.exports.config = {
    name: "slap",
    usage: ".slap <@User(optional)>",
    desc: 'Posts a slap image/gif.'
}