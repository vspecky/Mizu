const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (bot, message, args) => {

    if(!args[0] || isNaN(args[0])) return message.reply('Please specify a Number.');

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
        if(err) console.log(err);

        res.expMultiplier = Number(args[0]);

        res.save().catch(err => console.log(err));

    });

    return message.reply(`Guild Experience Multiplier was set to ${args[0]}`);

}

module.exports.config = {
    name: 'setexpmult'
}