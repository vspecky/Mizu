const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (bot, message, args) => {

    settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(args[0] == 'default') res.defaultEmbedColor = undefined;
        else res.defaultEmbedColor = parseInt(`0x${args[0].match(/\w+/)[0]}`);

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            title: 'Default Embed Color Update:',
            description: `The default embed color has been changed to ${args[0]}`,
        }).setColor(args[0]));
    })

}

exports.config = {
    name: 'defembedcolor',
    usage: "```.defembedcolor <colorHex>```\n('colorHex = default' for the default color.)",
    desc: 'Changes the default embed color for the bot.',
    note: 'Default color is grey'
}