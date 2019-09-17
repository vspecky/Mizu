const { RichEmbed } = require('discord.js');

module.exports = async (bot, oldMember, newMember) => {

    if(oldMember.roles.size !== newMember.roles.size) sendRoleUpdateEmbed(oldMember.roles, newMember.roles, bot.sets, newMember);
    if(oldMember.nickname !== newMember.nickname) sendNickUpdateEmbed(oldMember.nickname, newMember.nickname, newMember, bot.sets);
    if(oldMember.user.displayAvatarURL !== newMember.user.displayAvatarURL) sendAvatarUpdateEmbed(oldMember, newMember, bot.sets);

}

const sendRoleUpdateEmbed = (oldroles, newroles, settings, member) => {

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

const sendNickUpdateEmbed = (oldnick, newnick, member, settings) => {

    let nickUpdateEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setFooter(new Date().toUTCString())
    .setTitle(`👤 Nickname Update`)
    .addField(`${member.user.tag} (ID: ${member.id})`, `__**New Nickname:**__ ${newnick}\n\n__**Old Nickname:**__ ${oldnick}`);

    const channel = member.guild.channels.get(settings.logChannels.userupdateChannel);

    if(channel) channel.send(nickUpdateEmbed);

}

const sendAvatarUpdateEmbed = (oldMember, newMember, settings) => {

    let avatarUpdateEmbed = new RichEmbed()
    .setColor(settings.defaultEmbedColor)
    .setFooter(new Date().toUTCString())
    .setThumbnail(oldMember.user.displayAvatarURL)
    .setImage(newMember.user.displayAvatarURL)
    .addField(`${newMember.user.tag} (ID: ${newMember.id})`, 'Old Avatar →\nNew Avatar ↓');

    const channel = newMember.guild.channels.get(settings.logChannels.userupdateChannel);

    if(channel) channel.send(avatarUpdateEmbed);

}