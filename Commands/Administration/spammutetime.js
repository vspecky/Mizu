const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (bot, message, args) => {

    if(!args[0] || isNaN(args[0])) return message.reply('Please specify the spam mute time in minutes.');

    connect('mongodb/localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {

        if(args[0] == 0) {
            res.antiSpamSettings.antiSpamMuteTime = 99.013;
        } else {
            res.antiSpamSettings.antiSpamMuteTime = Math.abs(Number(args[0]));
        }

        res.save().catch(err => console.log(err));

        return message.reply(`Gotcha, the spam mute time has been set to ${args[0]} minutes.`)

    })

}

module.exports.config = {
    name: 'spammutetime'
}