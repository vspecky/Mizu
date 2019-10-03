const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const options = ['-ch', '-cd', '-ucd', '-dl'];
const ms = require('ms');

module.exports.run = async (Mizu, message, args) => {

    if(!message.guild.fetchMember(message.author).hasPermission(['ADMINISTRATOR'])) return;

    if(!args.length || args.length > 2 || !options.includes(args[0])) return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(Mizu.sets.defaultEmbedColor))

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    let settings = await setschema.findOne({ serverID: Mizu.sets.serverID });

    if(!settings.modMailSettings) settings.modMailSettings = {};

    if(args[0] === '-ch') {
        // Channel option
        const channel = message.mentions.channels.first() || message.guild.channels.get(args[1]);

        if(!channel) return message.channel.send(new RichEmbed({
            description: "The specified channel does not exist.",
            color: Mizu.sets.defaultEmbedColor
        }));

        settings.modMailSettings.modMailChannel = channel.id;

        message.channel.send(new RichEmbed({
            description: `The ModMail channel was set to <#${channel.id}>`,
            color: Mizu.sets.defaultEmbedColor
        }));

    } else if(args[0] === '-cd' || args[0] === '-ucd') {
        // Cooldown/Undetailed Cooldown

        if(!ms(args[1])) return message.channel.send(new RichEmbed({
            description: 'Please provide a valid time.',
            color: Mizu.sets.defaultEmbedColor
        }));

        if(args[0] === '-cd') settings.modMailSettings.modMailCooldown = ms(args[1]);
        else settings.modMailSettings.undetailedCooldown = ms(args[1]);

        message.channel.send(new RichEmbed({
            description: `The ModMail ${args[0] === '-cd' ? 'Cooldown' : 'Undetailed Cooldown'} was set to ${ms(ms(args[1]), { long: true })}`,
            color: Mizu.sets.defaultEmbedColor
        }));

    } else if(args[0] === '-dl') {
        // Detail Limit

        if(isNaN(args[1]) || !parseInt(args[1])) return message.channel.send(new RichEmbed({
            description: 'Please provide a valid Number.',
            color: Mizu.sets.defaultEmbedColor
        }));

        settings.modMailSettings.detailLimit = parseInt(args[1]);

        message.channel.send(new RichEmbed({
            description: `The ModMail Detail Limit was set to ${args[1]}`,
            color: Mizu.sets.defaultEmbedColor
        }));
    }

    return settings.save().catch(err => console.log(err));

}

module.exports.config = {
    name: "modmail",
    usage: "```.modmail <Option> <Argument>```",
    desc: "Sets the minimum word requirement for ModMail.\nOptions :\n1. **-ch** - Channel (Argument: <#Channel/ChannelID>)\n2. **-cd** - Cooldown (Argument: <Time>)\n3. **-ucd** - Undetailed Cooldown (Argument: <Time>)\n4. **-dl** - Detail Limit (Argument: <Number>)"
}