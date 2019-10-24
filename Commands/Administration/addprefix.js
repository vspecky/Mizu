const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) => {

    settings = Mizu.sets || {};

    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    if(!args[0] || args.length > 1) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {

        if(res.prefixes.includes(args[0])) return message.channel.send(new RichEmbed({
            description: `The prefix \`${args[0]}\` already exists.`,
            color: settings.defaultEmbedColor
        }));
        res.prefixes.push(args[0]);

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            description: `\`${args[0]}\` has been added as a prefix.`,
            color: settings.defaultEmbedColor
        }));
    });

}

module.exports.config = {
    name: 'addprefix',
    usage: ".addprefix <prefix>",
    note: 'Default prefix is "."',
    desc: 'Adds the provided prefix to the list of Mizu prefixes.'
}