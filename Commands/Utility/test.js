const discord = require('discord.js');
const superagent = require('superagent');
const Canvas = require('canvas');
const experience = require('../../models/expSchema.js');
let test;
let testVar = require('../../Events/Guild/message.js')
const { connect } = require('mongoose');
let testing = new Map();
let testarr = [1, 0, 2];
let usageEmbed = require('../../Handlers/usageinfo.js');
const setsObj = require('../../Handlers/settings.js').settings;
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    /*
    mongoose.connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    experience.findOne({ UUID: 4545 }, (err, exp) => {
        if(err) return console.log(err);

        if(!exp) return;


        let lvl = exp['277888888838815744'].EXPERIENCE;

        let xlvl = 1;
        let expnxt;
        let lvlnxt;

        

        //console.log(expnxt);
        //console.log(lvlnxt);
    })

    */
    let arr = [1,2,3];
    testembed = new discord.RichEmbed()
    .setTitle('testing')
    .addField('testing', `<@${message.author.id}>`)
    .setColor(setsObj().defaultEmbedColor);

    message.channel.send(testembed);
}


module.exports.config = {
    name: "test",
    usage: 'testUsage',
    notes: 'testNote'
}