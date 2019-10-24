const { RichEmbed } = require('discord.js');

module.exports.run = async(Mizu, message, args) =>{
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[1]) return message.reply(usageEmbed);

    const rMember = message.guild.fetchMember(message.mentions.users.first() || args[0]);
    if(!rMember) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'Couldn\'t find that user.'
    }));

    const role = args.slice(1).join(" ");
    if(!role) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'Please specify a valid role.'
    }));

    const gRole = message.guild.roles.find(r => r.name.toLowerCase() == role.toLowerCase());

    if(gRole.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')) return;

    if(!gRole) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: "That role does not exist."
    }));

    if(!rMember.roles.has(gRole.id)) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: "The user already doesn't have that role."
    }));
    rMember.removeRole(gRole.id);

    message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `The role ${gRole.name} has been removed from <@${rMember.id}>.`
    }));

}


module.exports.config = {
    name: "removerole",
    usage: ".removerole <@User/UserID> <RoleName>",
    desc: "Removes the specified role from the specified user.",
    aliases: ['rr']
}