const { RichEmbed } = require('discord.js');
const mongoose = require('mongoose');
const expschema = require('../../models/expSchema.js');

module.exports.run = async (bot, message, args) => {

    mongoose.connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    expschema.find().sort([['EXPERIENCE', 'descending']]).exec((err, res) => {
        if(err) console.log(err);
        message.channel.send(res[0]['LAST KNOWN USERNAME']);
    });

}

module.exports.help = {
    name: 'leaderboard'
}