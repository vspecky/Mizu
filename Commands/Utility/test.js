const discord = require('discord.js');
const vcperks = require(`F:\\BotCode\\Jun\\index.js`);
const superagent = require('superagent');

module.exports.run = async (bot,message,args) =>{
    let ab = message.guild.roles.find('name', 'Main Dev').id;

    console.log(ab);
}

module.exports.help = {
    name: "test"
}