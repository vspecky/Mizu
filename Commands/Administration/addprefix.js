const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async (bot, message, args) => {

    settings = setsObj() || {};

    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    if(!args[0]) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {

        if(res.prefixes.includes(args[0])) return message.reply('That prefix already exists.');
        res.prefixes.push(args[0]);

        res.save().catch(err => console.log(err));

        return message.reply(`\`${args[0]}\` has been added as a prefix`);
    });

}

module.exports.config = {
    name: 'addprefix',
    usage: "```.addprefix <prefix>```",
    note: 'Default prefix is "."',
    desc: 'Adds the provided prefix to the list of bot prefixes.'
}