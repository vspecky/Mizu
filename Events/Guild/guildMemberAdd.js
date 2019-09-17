const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const expschema = require('../../models/expSchema.js');
let antiRaidMap = new Map();
let antiRaidSet = new Set();

module.exports = async (bot, member) => {

    if(sRaidCheck(member, bot.sets.antiRaidSettings)) return informAboutSingleRaid(member, bot.sets);
    if(mRaidCheck(member, bot.sets.antiRaidSettings)) return informAboutMultiRaid(bot.sets);
    else {
        welcomeTheUser(member, bot.sets);
        checkIfOldUser(member);
    }

}

const sRaidCheck = (member, settings) => {

    let raidFlag = false;

    if(!antiRaidMap.get(member.id)) {
        antiRaidMap.set(member.id, 1);
        setTimeout(() => {
            antiRaidMap.delete(member.id);
        }, settings.smbuffer);
    }
    else {
        let joins = antiRaidMap.get(member.id);
        joins += 1;
        if(joins >= settings.smjoinsNumber) {
            raidFlag = true;
            member.guild.ban(member.id);
        } else antiRaidMap.set(member.id, joins);
    }

    return raidFlag;

}

const mRaidCheck = (member, settings) => {

    // Set a raid flag = false first
    let raidFlag = false;

    // Check if the set has the member ID. If not then add the ID
    if(!antiRaidSet.has(member.id)) {
        antiRaidSet.add(member.id);

        // Timeout to remove the member ID from the set (equal to the set buffer timeout)
        setTimeout(() => {
            antiRaidSet.delete(member.id);
        }, settings.mmbuffer);

    // Check if the size of the set has exceeded the set amount of max users permitted.
    } else if(antiRaidSet.size >= settings.mmjoinsNumber) {
        // If it has, set the raid flag to true and ban all members in the set.
        raidFlag = true;
        antiRaidSet.forEach(uuid => member.guild.ban(uuid));
    }

    // Return the raid flag (true/false)
    return raidFlag;

}

const informAboutSingleRaid = (member, settings) => {

    const channel = member.guild.channels.get(settings.logChannels.banChannel);

    let raidEmbed = new RichEmbed()
    .setColor(settings.embCols.banEmbedColor || settings.defaultEmbedColor)
    .setTitle(`⛔Anti-Raid Ban: (Single User)`)
    .setThumbnail(member.user.displayAvatarURL)
    .addField('Banned User:', `${member.user.tag} ID: ${member.id}`)
    .setFooter(new Date().toUTCString());

    if(channel) channel.send(raidEmbed);

}

const informAboutMultiRaid = settings => {

    const channel = member.guild.channels.get(settings.logChannels.banChannel);

    let uuidstr = '';

    antiRaidSet.forEach(uuid => uuidstr += `${uuid}\n`);

    uuidstr = uuidstr.replace(/\n$/, '');

    let raidEmbed = new RichEmbed()
    .setColor(settings.embCols.banEmbedColor || settings.defaultEmbedColor)
    .setTitle(`⛔Anti-Raid Ban: (Multiple Users)`)
    .addField('Banned Users (UUIDs):', uuidstr)
    .setFooter(new Date().toUTCString());

    if(channel) channel.send(raidEmbed);

}

const welcomeTheUser = (member, settings) => {

    const message = settings.welcomeSettings.welcomeMsg.replace(/@user/, `<@${member.id}>`);

    const channel = member.guild.channels.get(settings.welcomeSettings.welcomeChannel);

    if(channel) channel.send(message);

}

const checkIfOldUser = async member => {

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    const guildmember = await expschema.findOne({ UUID: member.id });

    if(!guildmember) {
        let newmember = new expschema({
            UUID: parseInt(member.id),
            '277888888838815744': {
                EXPERIENCE: 0,
                'WEEKLY EXPERIENCE': 0,
                COMBO: 0
            },
            'LAST KNOWN USERNAME': member.user.username
        });

        return newmember.save().catch(err => console.log(err));
    } else reassignRoles(member.id, guildmember['277888888838815744'].EXPERIENCE);

}