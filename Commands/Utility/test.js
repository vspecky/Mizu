const discord = require('discord.js');
const fetch = require('node-fetch');
const Canvas = require('canvas');
const experience = require('../../models/expSchema.js');
let test;
let testVar = require('../../Events/Guild/message.js')
const { connect } = require('mongoose');
let testing = new Map();
let testarr = [1, 0, 2];
const setsObj = require('../../Handlers/settings.js').settings;
const ms = require('ms');
const setsschema = require('../../models/settingsSchema.js');
const marriage = require('../../models/marriageSchema.js');
const repeatFunc = require('./repeat.js').intervals;
const cheerio = require('cheerio');

module.exports.run = async (Mizu, message, args) => {

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
    console.log(message.guild.roles.get('592281928170864660').calculatedPosition);
    console.log(message.member.highestRole.calculatedPosition);
    
}


module.exports.config = {
    name: "test",
    usage: 'testUsage',
    notes: 'testNote'
}

module.exports.test = () => testing;