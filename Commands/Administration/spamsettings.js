const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');
const reply = 'Usage: `.spamsettings general/similar x y`\nx = No. of messages\ny = Time buffer in seconds'

module.exports.run = async (bot, message, args) => {

    if(!isNaN(args[0]) || !args[2] || isNaN(args[1]) || isNaN(args[2])) return message.reply(reply);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
        if(err) console.log(err);

        if(args[0].toLowerCase() == 'general'){
            res.antiSpamSettings.genSpamMsgs = Math.abs(Number(args[1]));
            res.antiSpamSettings.genSpamBuffer = Math.abs(Number(args[2]));
            res.save().catch(err => console.log(err));
        } else if(args[0].toLowerCase() == 'similar') {
            res.antiSpamSettings.sameSpamMsgs = Math.abs(Number(args[1]));
            res.antiSpamSettings.sameSpamBuffer = Math.abs(Number(args[2]));
            res.save().catch(err => console.log(err));
        } else {
            return message.reply(reply);
        }

        let ssetEmbed = new RichEmbed()
        .setTitle(`${args[0].toUpperCase()} Spam Settings Changed:`)
        .setDescription(`Messages: ${args[1]}\nTime Buffer: ${args[2]} seconds`);

        return message.channel.send(ssetEmbed);

    });

    

}

module.exports.config = {
    name: 'spamsettings'
}