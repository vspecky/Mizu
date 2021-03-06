const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');
const ms = require('ms');


module.exports.run = async (Mizu, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!isNaN(args[0]) || args.length < 3 || isNaN(args[1]) || !ms(args[2])) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(err) console.log(err);

        if(args[0].toLowerCase() == 'general'){
            res.antiSpamSettings.genSpamMsgs = Math.abs(Number(args[1]));
            res.antiSpamSettings.genSpamBuffer = ms(args[2]);
            res.save().catch(err => console.log(err));
        } else if(args[0].toLowerCase() == 'similar') {
            res.antiSpamSettings.sameSpamMsgs = Math.abs(Number(args[1]));
            res.antiSpamSettings.sameSpamBuffer = ms(args[2]);
            res.save().catch(err => console.log(err));
        } else {
            return message.reply(usageEmbed);
        }

        let ssetEmbed = new RichEmbed()
        .setTitle(`${args[0].toUpperCase()} Spam Settings Changed:`)
        .setColor(settings.defaultEmbedColor)
        .setDescription(`**Messages:** ${args[1]}\n**Time Buffer:** ${ms(ms(args[2]), { long: true })}`);

        return message.channel.send(ssetEmbed);

    });   
}

module.exports.config = {
    name: 'spamsettings',
    usage: ".spamsettings <'general'/'similar'> <msgAmount> <bufferTime>",
    desc: "Changes the Anti-Spam settings (General or Similar) of the guild."
}