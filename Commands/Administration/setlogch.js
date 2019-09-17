const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

const options = ['warn', 'kick', 'ban', 'mute', 'msgdel', 'userupdate', 'reports', 'suggest', 'oofchest'];

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(['ADMINISTRATOR'])) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || args[2] || !options.includes(args[0].toLowerCase())) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        const channelID = message.content.match(/\d{18}/g)[0];
        if(!message.guild.channels.get(channelID)) return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: 'Invalid channel argument.'
        }));
        res.logChannels[`${args[0].toLowerCase()}Channel`] = channelID;
        res.save().catch(err => console.log(err));
        return message.channel.send(new RichEmbed({
            title: "Logs Channel Update:",
            description: `The logs channel for '${args[0].toLowerCase()}' events has been set to <#${channelID}>`,
            color: settings.defaultEmbedColor
        }));
    });

}

module.exports.config = {
    name: 'setlogch',
    usage: "```.setlogch <Type> <#Channel/ChannelID>```",
    desc: 'Sets the log channel for the specified event.\nEvents:\n1. mute\n2. kick\n3. ban\n4. warn\n5. reports\n6. msgdel\n7. userupdate\n8. suggest\n9. oofchest',

}