const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) => {

    settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {

        if(!res.prefixes.includes(args[0])) return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: "That prefix already doesn't exist."
        }));
        res.prefixes.splice(res.prefixes.indexOf(args[0]));

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: `\`${args[0]}\` has been removed as a prefix.`
        }));
    });

}

module.exports.config = {
    name: 'delprefix',
    usage: "```.delprefix <prefix>```",
    note: 'Default prefix is "."',
    desc: 'Removes the given prefix from the list of Mizu prefixes.'
}