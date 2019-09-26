const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (bot, message, args) => {

    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(bot.sets.defaultEmbedColor);

    if(!args.length || args.length > 2 || args.length == 1) return message.reply(usageEmbed);

    if(!Object.keys(bot.modules).includes(args[0])) return message.channel.send(new RichEmbed({
        description: "That module does not exist.",
        color: bot.sets.defaultEmbedColor
    }));

    const channel = message.mentions.channels.first() || message.guild.channels.get(args[1]);

    if(!channel) return message.channel.send(new RichEmbed({
        description: "The specified channel does not exist.",
        color: bot.sets.defaultEmbedColor
    }));

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: bot.sets.serverID }, (err, res) => {
        if(err) console.log(err);

        if(!res.modBlockedChannels) res.modBlockedChannels = {};
        if(!res.modBlockedChannels[args[0]]) res.modBlockedChannels[args[0]] = [];

        res.modBlockedChannels[args[0]].push(channel.id);

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            description: `The '${args[0]}' module was disabled in <#${channel.id}>`,
            color: bot.sets.defaultEmbedColor
        }));
    });

}

module.exports.config = {
    name: "moduleblock",
    usage: "```.moduleblock <ModuleName> <#Channel/ChannelID>```",
    desc: "Blocks all the specified module commands in the specified channel."
}