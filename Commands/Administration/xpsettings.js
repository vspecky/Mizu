const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
const ms = require('ms');
const options = ['-cia', '-ci', '-mc', '-lxp', '-hxp', '-xpc', '-xpm']

module.exports.run = async (Mizu, message, args) => {

    if(!message.guild.fetchMember(message.author).hasPermission(['ADMINISTRATOR'])) return;

    const usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(Mizu.sets.defaultEmbedColor);

    if(args.length !== 2 || !options.includes(args[0])) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    const sets = await setschema.findOne({ serverID: Mizu.sets.serverID });

    if(!sets) return message.channel.send(new RichEmbed({
        description: "Couldn't find Guild Settings in MongoDB.",
        color: Mizu.sets.defaultEmbedColor
    }));

    if(!sets.expSettings) sets.expSettings = {};

    let setchng;

    switch(args[0]) {

        case '-cia':
        if(isNaN(args[1])) return message.reply(usageEmbed);
        sets.expSettings.comboIncrement = Number(args[1]);
        setchng = '-cia';
        break;

        case '-ci':
        if(!ms(args[1])) return message.reply(usageEmbed);
        sets.expSettings.comboInterval = ms(args[1]);
        setchng = '-ci';
        break;

        case '-mc':
        if(isNaN(args[1])) return message.reply(usageEmbed);
        sets.expSettings.maxCombo = Number(args[1]);
        setchng = '-mc';
        break;

        case 'lxp':
        if(isNaN(args[1])) return message.reply(usageEmbed);
        sets.expSettings.lowestExp = Number(args[1]);
        setchng = '-lxp';
        break;

        case '-hxp':
        if(isNaN(args[1])) return message.reply(usageEmbed);
        sets.expSettings.highestExp = Number(args[1]);
        setchng = '-hxp';
        break;

        case '-xpc':
        if(!ms(args[1])) return message.reply(usageEmbed);
        sets.expSettings.expCooldown = ms(args[1]);
        setchng = '-xpc';
        break;

        case '-xpm':
        if(isNaN(args[1])) return message.reply(usageEmbed);
        sets.expSettings.expMultiplier = Number(args[1]);
        setchng = '-xpm';
        break;

    }

    sets.save().catch(err => console.error(err));

    return message.channel.send(new RichEmbed({
        description: `The ${keys[setchng]} settings were updated.`,
        color: Mizu.sets.defaultEmbedColor
    }));

}

const keys = {
    '-cia': 'Combo Increment Amount',
    '-ci': 'Combo Interval',
    '-mc': 'Max Combo',
    '-lxp': 'Lowest xp Amount',
    '-hxp': 'Highest xp Amount',
    '-xpc': 'xp Cooldown',
    '-xpm': 'xp Multiplier'
}

module.exports.config = {
    name: 'xpsettings',
    usage: ".xpsettings <Option> <Value>",
    desc: "Changes the Guild xp settings.\nOptions:\n1. Combo Increment Amount (-cia) <Number>\n2. Combo Interval (-ci) <Time>\n3. Max Combo (-mc) <Number>\n4. Lowest xp Amount (-lxp) <Number>\n5. Highest xp Amount (-hxp) <Number>\n6. xp Cooldown (-xpc) <Time>\n7. xp Multiplier (-xpm) <Number>"
}