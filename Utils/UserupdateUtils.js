const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const nickschema = require('../models/nicknameSchema.js');
const expschema = require('../models/expSchema.js');

module.exports = class UserupdateUtils {

    /**
    * Sends an embed in the userupdate logchannel regarding a role update.
    *
    * @param {MemberRoles} oldroles
    * @param {MemberRoles} newroles
    * @param {GuildSettings} settings
    * @param {GuildMember} member
    */
    RoleUpdate(oldroles, newroles, settings, member) {

        let roleUpdateEmbed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setFooter(new Date().toUTCString());

        if(oldroles.size > newroles.size) {
            Array.from(oldroles.keys()).forEach(roleID => {
                if(!newroles.has(roleID)) {
                    const updatedrole = oldroles.get(roleID);

                    roleUpdateEmbed.setTitle(`🛠 Role Removed`)
                    .addField(`${member.user.tag} (ID: ${member.id})`, updatedrole.name);
                }         
            });
        } else if(oldroles.size < newroles.size) {
            Array.from(newroles.keys()).forEach(roleID => {
                if(!oldroles.has(roleID)) {
                    const updatedrole = newroles.get(roleID);

                    roleUpdateEmbed.setTitle(`🛠 Role Added`)
                    .addField(`${member.user.tag} (ID: ${member.id})`, updatedrole.name);
                }         
            });
        }

        const channel = member.guild.channels.get(settings.logChannels.userupdateChannel);

        if(channel) channel.send(roleUpdateEmbed);

    }

    /**
    * Sends an embed in the userupdate logchannel regarding a nickname update.
    *
    * @param {String} oldnick
    * @param {String} newnick
    * @param {GuildMember} member
    * @param {GuildSettings} settings
    */
    NicknameUpdate(oldnick, newnick, member, settings) {

        let nickUpdateEmbed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setFooter(new Date().toUTCString())
        .setTitle(`👤 Nickname Update`)
        .addField(`${member.user.tag} (ID: ${member.id})`, `__**New Nickname:**__ ${newnick}\n\n__**Old Nickname:**__ ${oldnick}`);

        const channel = member.guild.channels.get(settings.logChannels.userupdateChannel);

        if(channel) channel.send(nickUpdateEmbed);

        connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });

        nickschema.findOne({ UUID: member.id }, (err, res) => {
            
            if(err) console.log(err);
            if(!res) {
                let newNick = new nickschema({
                    UUID: member.id,
                    nicknames: [newnick]
                });

                newNick.save().catch(err => console.log(err));
            } else {
                res.nicknames.push(newnick);
                while(res.nicknames.length > 20) res.nicknames.shift();
                res.save().catch(err => console.log(err));
            }

        });

    }

    /**
    * Sends an embed in the userupdate logchannel regarding a user avatar update.
    *
    * @param {UserResolvable} olduser
    * @param {UserResolvable} newuser
    * @param {Client} Mizu
    */
    AvatarUpdate(olduser, newuser, Mizu) {

        let avatarUpdateEmbed = new RichEmbed()
        .setColor(Mizu.sets.defaultEmbedColor)
        .setThumbnail(olduser.displayAvatarURL)
        .setImage(`${newuser.displayAvatarURL}?size=128`)
        .setTitle(`👦Avatar Update:`)
        .setDescription(`${newuser.tag} (ID: ${newuser.id})`)
        .setFooter(new Date().toUTCString());

        const channel = Mizu.channels.get(Mizu.sets.logChannels.userupdateChannel);

        if(channel) channel.send(avatarUpdateEmbed);

    }

    /**
    * Sends an embed in the userupdate logchannel regarding a tag update.
    *
    * @param {UserResolvable} olduser
    * @param {UserResolvable} newuser
    * @param {Client} Mizu
    */
    TagUpdate(olduser, newuser, Mizu) {

        let tagUpdateEmbed = new RichEmbed()
        .setColor(Mizu.sets.defaultEmbedColor)
        .setTitle(`🏷Username Update:`)
        .setDescription(`**New Username:** ${newuser.tag}\n**Old Username:** ${olduser.tag}\n(ID: ${newuser.id})`)
        .setFooter(new Date().toUTCString());

        const channel = Mizu.channels.get(Mizu.sets.logChannels.userupdateChannel);

        if(channel) channel.send(tagUpdateEmbed);

        if(newuser.username === olduser.username) return;

        connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });

        expschema.findOne({ UUID: newuser.id }, (err, res) => {

            if(err) console.log(err);
            if(!res) {
                const newexp = new expschema({
                    UUID: newuser.id,
                    'LAST KNOWN USERNAME': newuser.username,
                });

                newexp.save().catch(err => console.log(err));
            } else {
                res['LAST KNOWN USERNAME'] = newuser.username;

                res.save().catch(err => console.log(err));
            }

        });

    }

}