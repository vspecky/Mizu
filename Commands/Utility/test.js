const discord = require('discord.js');
const superagent = require('superagent');
const Canvas = require('canvas');
const experience = require('../../models/expSchema.js');
const mongoose = require('mongoose');

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

    message.channel.send('works');

    //console.log(message.createdTimestamp);
    //console.log(message.member.lastMessage);

    

    //console.log(g);
    */

   let rety = message.guild.members.find(user => user.id === '371576327872184320');

   console.log(rety);

}

module.exports.help = {
    name: "test"
}