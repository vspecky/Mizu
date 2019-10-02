const { RichEmbed } = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    const settings = bot.sets;
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    if(args[0] || args[1]) return message.reply(usageEmbed);

    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send(new RichEmbed({
        description: "That user does not exist.",
        color: settings.defaultEmbedColor
    }));

    let role = args.slice(1).join(" ");

    let gRole = message.guild.roles.find(r => r.name.toLowerCase() == role.toLowerCase()) || message.guild.roles.find(r => r.id == role);
    if(!gRole) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: 'That role does not exist.'
    }));

    if(rMember.roles.has(gRole.id)) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: "The user already has that role."
    }));
    await rMember.addRole(gRole.id); 

    return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `<@${rMember.id}> has been assigned the role ${gRole.name}.`
    }));

}


module.exports.config = {
    name: "addrole",
    aliases: ['ar'],
    usage: "```.addrole <@User/UUID> <RoleName/ID>```",
    desc: "Adds the specified role to the specified user."
}