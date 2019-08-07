const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{

    let {body} = await superagent
    .get("https://random.dog/woof.json");

    let dogEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("Doggo :dog:")
    .setImage(body.url);

    message.channel.send(dogEmbed);

    return;
}

module.exports.help = {
    name: "doggo"
}