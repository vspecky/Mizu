const { RichEmbed } = require('discord.js');

const settingvalues = ['general', 'logchannels', 'antispam', 'warnactions'];

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(['ADMINISTRATOR'])) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !settingvalues.includes(args[0].toLowerCase()) || args.length > 1) return message.reply(usageEmbed);

    return message.channel.send(getSettingsEmbed(settings, args[0]));

}

const getSettingsEmbed = (sets, query) => {

    let setsEmbed = new RichEmbed().setColor(sets.defaultEmbedColor);

    if(query.toLowerCase() == 'logchannels') {
        const logset = Object.keys(sets.logChannels);
        let logstr = '';
        for(field of logset) {
            let chanID = sets.logChannels[field];
            if(chanID) chanID = `<#${chanID}>`;
            else chanID = 'Not set';
            if(field != '$init') logstr = logstr + `**${setObject.field}**: ${chanID}\n`;
        }
        if(logstr.length) {
            logstr.replace(/\n$/, '');
            setsEmbed.setTitle('Log Channel Settings:').setDescription(logstr);
            return setsEmbed;
        } else {
            setsEmbed.setTitle('Log Channel Settings:').setDescription('No log channels set.');
            return setsEmbed;
        }    
    }

}

const setObject = {
    muteChannel: 'Mute',
    kickChannel: 'Kick',
    banChannel: 'Ban',
    warnChannel: 'Warn',
    reportsChannel: 'Report',
    userupdateChannel: 'Userupdate',
    msgdelChannel: 'Msgdel'
}

module.exports.config = {
    name: 'getsettings',
    usage: "```.getsettings <Settings>```",
    desc: "Gets the specified settings for the Guild.\nSettings:\n1. general\n2. logchannels\n3. antispam\n4. warnactions"
}