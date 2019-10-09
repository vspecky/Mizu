const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const expschema = require('../models/expSchema.js');
const antiRaidMap = new Map();
const antiRaidSet = new Set();

module.exports = class NewMemberUtils {

    /**
     * Checks if a single user is raiding the server and returns a flag.
     *
     * @param {GuildMember} member
     * @param {GuildSettings} settings
     * @returns Raid Flag (True if single raid detected, false otherwise)
     */
    SingleRaidCheck(member, settings) {

        // Set the raid flag to false first
        let raidFlag = false;
    
        if(!antiRaidMap.get(member.id)) {
            // If the antiraid map doesn't have the member ID, set it to a value of 1 and set a timeout to delete it in the buffer time
            antiRaidMap.set(member.id, 1);
            setTimeout(() => {
                antiRaidMap.delete(member.id);
            }, settings.smbuffer);
        }
        else {
            /* else, increment the joins by 1. If the amount exceeds the raid limit, ban the member
            else just set the new joins value to the map against the user ID */
            let joins = antiRaidMap.get(member.id);
            joins += 1;
            if(joins >= settings.smjoinsNumber) {
                raidFlag = true;
                member.guild.ban(member.id);
            } else antiRaidMap.set(member.id, joins);
        }
    
        return raidFlag;
    
    }

    /**
     *
     *
     * @param {GuildMember} member
     * @param {GuildSettings} settings
     * @returns
     */
    MultiRaidCheck(member, settings) {

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
    
        // Return the raid flag (true/false).
        return raidFlag;
    
    }

    /**
     * If the single raid check returns a true flag, sends information about the banned user
     * in the ban logs channel.
     * @param {GuildMember} member
     * @param {GuildSettings} settings
     */
    InformSingleRaid(member, settings) {

        const channel = member.guild.channels.get(settings.logChannels.banChannel);
    
        let raidEmbed = new RichEmbed()
        .setColor(settings.embCols.banEmbedColor || settings.defaultEmbedColor)
        .setTitle(`⛔Anti-Raid Ban: (Single User)`)
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Banned User:', `${member.user.tag} ID: ${member.id}`)
        .setFooter(new Date().toUTCString());
    
        if(channel) channel.send(raidEmbed);
    
    }

    /**
     * If the multi raid check returns a true flag, sends information about the banned users
     * in the ban logs channel.
     * @param {GuildSettings} settings
     */
    InformMultiRaid(settings) {

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

    /**
     * Sends a welcome message in the designated welcome channel for the new member.
     *
     * @param {GuildMember} member
     * @param {GuildSettings} settings
     */
    WelcomeUser(member, settings) {

        const message = settings.welcomeSettings.welcomeMsg.replace(/@user/, `<@${member.id}>`);
    
        const channel = member.guild.channels.get(settings.welcomeSettings.welcomeChannel);
    
        if(channel) channel.send(message);
    
    }

    /**
     * Checks if the new member was in the guild before and if so, gets their old experience and reassigns leveled roles
     *
     * @param {GuildMember} member
     */
    async CheckOldUser(member) {

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
    
            return newmember.save().catch(err => console.error(err));
        } else reassignRoles(member.id, guildmember['277888888838815744'].EXPERIENCE);
    
    }

}