const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');
const options = ['default', 'warn', 'mute', 'kick', 'ban'];

module.exports.run = async (Mizu, message, args) => {

    settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args.length || args.length > 2) return message.reply(usageEmbed);

    if(!options.includes(args[0].toLowerCase())) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(args[0].toLowerCase() == 'default') res.defaultEmbedColor = parseInt(`0x${args[1].match(/\w+/)[0]}`);
        else res.embCols[`${args[0].toLowerCase()}EmbedColor`] = parseInt(`0x${args[1].match(/\w+/)[0]}`);

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            title: 'Default Embed Color Update:',
            description: `The default embed color has been changed to ${args[0]}`,
            color: settings.defaultEmbedColor
        }));
    })

}

exports.config = {
    name: 'setembcol',
    usage: "```.defembedcolor <colorHex>```\n('colorHex = default' for the default color.)",
    desc: 'Changes the default embed color for the Mizu.',
    note: 'Default color is grey'
}