const { RichEmbed } = require("discord.js");
const Warning = require('../../models/warnSchema.js');
const { connect } = require('mongoose');

const ms = require('ms');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return;

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    let wChannel = message.guild.channels.get(settings.logChannels.warnChannel);

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!wUser) return message.channel.send("Invalid user argument.");

    if (wUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return;

    let wReason = args.slice(1).join(' ');

    let date = new Date().toUTCString();

    let infoEmbed = new RichEmbed()
        .setTitle(`❗User Warning :`)
        .setColor(settings.defaultEmbedColor)
        .addField("Warned User :", `${wUser} ID: ${wUser.id}`)
        .addField("Reason :", wReason)
        .setFooter(date);

    let userNotif = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .addField(`You have been warned❗ in ${message.guild.name} for the following reason :`, wReason)
        .setFooter(date);

    message.channel.send(infoEmbed);

    infoEmbed.addField("Warned By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setThumbnail(wUser.user.displayAvatarURL);

    if(wChannel) wChannel.send(infoEmbed);
    try { wUser.send(userNotif); } catch(err) { console.log(err); }

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });


    Warning.findOne({ UserID: wUser.id }, (err, warn) =>{
        if(err) console.log(err);
        if(!warn){
            const warning = new Warning({
                _id: message.id,
                Tag: wUser.user.tag,
                UserID: wUser.id,
                Logs : [{
                    reason: `${wReason}`,
                    time: `${message.createdAt}`
                }]
            });

            issueAction(message, settings, wUser, warning, date);

            warning.save().catch(err => console.log(err));
        }else{
            warn.Logs.push({
                reason: `${wReason}`,
                time: `${message.createdAt}`
            });

            issueAction(message, settings, wUser, warn, date);

            warn.save().catch(err => console.log(err));
        }


    });

    return;


}

const issueAction = (message, settings, wUser, warn, date) => {
    if(settings.warnPunishments) {
        if (settings.warnPunishments[`${warn.Logs.length}warn`]) {

            const actionobj = settings.warnPunishments[`${warn.Logs.length}warn`];
            let actionEmbed = new RichEmbed()
            .setColor(settings.defaultEmbedColor)
            .setTitle(`Warn Action: (Strikes: ${warn.Logs.length})`)
            .addField('User:', `${wUser.user.tag} ID: ${wUser.id}`)
            .setThumbnail(wUser.user.displayAvatarURL)
            .setFooter(date);

            if(actionobj.action == 'mute') {
                const muteRole = message.guild.roles.get(settings.muteRole).id;
                const muteChannel = message.guild.channels.get(settings.logChannels.muteChannel);
                let action = `🔇Muted`
                wUser.addRole(muteRole);
                if (actionobj.timeout && actionobj.timeout != 'permanent') {
                    setTimeout(() => {
                        wUser.removeRole(muteRole);
                    }, actionobj.timeout);
                    action = action + ` (Timeout: ${ms(actionobj.timeout, { long: true })})`;
                } else {
                    action = action + ' (Timeout: Permanent)'
                }
                actionEmbed.addField('Action:', action);
                message.channel.send(actionEmbed);
                if(muteChannel) muteChannel.send(actionEmbed);

            } else if(actionobj.action == 'ban') {
                let action = `⛔Banned`;
                const banChannel = message.guild.channels.get(settings.logChannels.banChannel);
                message.guild.ban(wUser.user);
                if(actionobj.timeout && actionobj.timeout != 'permanent') {
                    setTimeout(() => {
                        message.guild.unban(wUser.user);
                    }, actionobj.timeout);
                    action = action + ` (Timeout: ${ms(actionobj.timeout, { long: true })})`;
                } else {
                    action = action + ' (Timeout: Permanent)';
                }
                actionEmbed.addField('Action:', action);
                message.channel.send(actionEmbed);
                if(banChannel) banChannel.send(actionEmbed);

            } else if(actionobj.action == 'kick') {
                let action = `👢Kicked`;
                const kickChannel = message.guild.channels.get(settings.logChannels.kickChannel);
                message.guild.kick(wUser.user);
                actionEmbed.addField('Action:', action);
                message.channel.send(actionEmbed);
                if(kickChannel) kickChannel.send(actionEmbed);
            }

        }
    }
}

module.exports.config = {
    name: "warn"
}