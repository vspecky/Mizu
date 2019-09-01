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
        if(args[0] == 'default') res.defaultEmbedColor = undefined;
        else res.defaultEmbedColor = `${args[0]}`;

        res.save().catch(err => console.log(err));

        return message.reply(`The default embed color has been set to ${args[0]}`);
    })

}

exports.config = {
    name: 'defembedcolor',
    usage: "```.defembedcolor <colorHex>```\n('colorHex = default' for the default color.)",
    desc: 'Changes the default embed color for the bot.',
    note: 'Default color is grey'
}