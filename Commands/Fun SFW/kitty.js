const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{

    let {body} = await superagent
    .get(`http://aws.random.cat/meow`);

    let catEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("Kitty! :cat:")
    .setImage(body.file);

    message.channel.send(catEmbed);

    return;

}

module.exports.help = {
    name: "kitty"
}