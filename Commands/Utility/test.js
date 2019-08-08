const discord = require('discord.js');
const vcperks = require(`F:\\BotCode\\Jun\\index.js`);
const superagent = require('superagent');

module.exports.run = async (bot,message,args) =>{

    console.log(vcperks.vcPerks);
}

module.exports.help = {
    name: "test"
}