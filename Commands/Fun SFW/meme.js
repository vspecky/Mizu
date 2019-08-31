const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{

    let {body} = await superagent
    .get("https://meme-api.herokuapp.com/gimme");


    let memeEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle("Here's your meme, served fresh!")
    .setImage(body.url);

    message.channel.send(memeEmbed);

    return;
}

module.exports.config = {
    name: "meme",
    usage: "j!meme"
}