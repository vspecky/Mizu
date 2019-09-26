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
const testFunc = require('./test.js').test;

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
    
    console.log(testFunc());
    
}


module.exports.config = {
    name: "test2",
    usage: 'testUsage',
    notes: 'testNote'
}