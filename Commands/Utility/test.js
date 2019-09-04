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
const setsschema = require('../../models/settingsSchema.js');
const marriage = require('../../models/marriageSchema.js');

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
   

    const role = message.guild.roles.get('592604877855784971');

    if (role.hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS', 'KICK_MEMBERS'])) console.log('success');
    //message.channel.send(embed);
}


module.exports.config = {
    name: "test",
    usage: 'testUsage',
    notes: 'testNote'
}