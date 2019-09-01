const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async (bot, message, args) => {

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || isNaN(args[0])) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(err) console.log(err);

        res.expMultiplier = Number(args[0]);

        res.save().catch(err => console.log(err));

        return message.reply(`Guild Experience Multiplier was set to ${args[0]}`);

    });
}

module.exports.config = {
    name: 'setexpmult',
    usage: '```.setexpmult <Number>```',
    desc: 'Sets the guild exp multiplier. (Default: 1)'
}