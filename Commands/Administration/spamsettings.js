const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');
const reply = 'Usage: `.spamsettings x y`\nx = No. of messages\ny = Time buffer in seconds'

module.exports.run = async (bot, message, args) => {

    if(!args[0] || !args[1] || isNaN(args[0]) || isNaN(args[1])) return message.reply(reply);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
        if(err) console.log(err);

        res.antiSpamMsgs = parseInt(args[0]);
        res.antiSpamTime = parseInt(args[1]);

        res.save().catch(err => console.log(err));
    });

    let ssetEmbed = new RichEmbed()
    .setTitle('Spam Settings Changed :')
    .setDescription(`Messages: ${args[0]}\nTime Buffer: ${args[1]} seconds`);

    message.channel.send(ssetEmbed);

}

module.exports.config = {
    name: 'spamsettings'
}