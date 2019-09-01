const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async (bot, message, args) => {

    settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {

        if(!res.prefixes.includes(args[0])) return message.reply("That prefix already doesn't exist.");
        res.prefixes.splice(res.prefixes.indexOf(args[0]));

        res.save().catch(err => console.log(err));

        return message.reply(`\`${args[0]}\` has been removed as a prefix`);
    });

}

module.exports.config = {
    name: 'delprefix',
    usage: "```.delprefix <prefix>```",
    note: 'Default prefix is "."',
    desc: 'Removes the given prefix from the list of bot prefixes.'
}