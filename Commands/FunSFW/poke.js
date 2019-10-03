const discord = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();


module.exports.run = async(Mizu, message, args) =>{

    const settings = Mizu.sets;

    const body = await neko.sfw.poke();
    
    let pokeEmbed = new discord.RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setTitle(`*Poke*`)
    .setImage(body.url);

    const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!wUser) return message.channel.send(pokeEmbed.setTitle('*poke*'));
    if(message.author.id == wUser.id) return message.channel.send(pokeEmbed.setTitle(`${message.author.tag} pokes themself!`));
    if(wUser.id == Mizu.user.id) return message.channel.send(`<@${message.author.id}> can't touch this! :smirk:`);
    return message.channel.send(pokeEmbed.setTitle(`${message.author.tag} pokes ${wUser.user.tag}. *poke*`));
}

module.exports.config = {
    name: "poke",
    usage: "j!poke || j!poke @user"
}