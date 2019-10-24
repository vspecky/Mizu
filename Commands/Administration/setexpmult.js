const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || isNaN(args[0])) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(err) console.log(err);

        res.expMultiplier = Number(args[0]);

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: `Guild Experience Multiplier was set to ${args[0]}.`
        }));

    });
}

module.exports.config = {
    name: 'setexpmult',
    usage: '.setexpmult <Number>',
    desc: 'Sets the guild exp multiplier. (Default: 1)'
}