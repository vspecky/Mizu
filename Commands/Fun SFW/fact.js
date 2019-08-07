const discord = require('discord.js');
const superagent = require("superagent");

module.exports.run = async (bot, message, args) =>{

    let {body} = await superagent.get("https://uselessfacts.jsph.pl/random.json?language=en");

    return message.channel.send(body.text);

}

module.exports.help = {
    name: "fact"
}