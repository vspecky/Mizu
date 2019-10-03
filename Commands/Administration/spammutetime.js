const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');


module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || isNaN(args[0])) return message.reply(usageEmbed);

    connect('mongodb/localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {

        if(args[0] == 0) {
            res.antiSpamSettings.antiSpamMuteTime = 99.013;
        } else {
            res.antiSpamSettings.antiSpamMuteTime = Math.abs(Number(args[0]));
        }

        res.save().catch(err => console.log(err));

        let embed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setDescription(`The spam mute time has been set to ${args[0]} minutes.`)
        return message.channel.send(embed);

    })

}

module.exports.config = {
    name: 'spammutetime',
    usage: '```.spammutetime <Number>```',
    desc: 'Sets the temporary mute time for spamming. (Default: 5 minutes)',
    note: 'Set to 0 to make the mute permanent.'
}