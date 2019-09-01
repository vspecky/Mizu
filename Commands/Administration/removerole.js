let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async(bot, message, args) =>{
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    const settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !args[1]) return message.reply(usageEmbed);

    const rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("Couldn't find that user.");

    const role = args.slice(1).join(" ");
    if(!role) return message.reply("Please specify a role.");

    const gRole = message.guild.roles.find(r => r.name.toLowerCase() == role.toLowerCase());

    if(!gRole) return message.reply("That role does not exist.");

    if(!rMember.roles.has(gRole.id)) return message.reply("The user already doesn't have that role.");
    rMember.removeRole(gRole.id);

    message.channel.send(`The role ${gRole.name} has been removed from <@${rMember.id}>.`);

}


module.exports.config = {
    name: "removerole",
    usage: "```.removerole <@User/UserID> <RoleName>```",
    desc: "Removes the specified role from the specified user.",
    aliases: ['rr']
}