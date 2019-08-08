const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the permissions to do that.");

    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send("Couldn't find that user.");

    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("Please specify a role.");

    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.channel.send("That role does not exist.");

    if(!rMember.roles.has(gRole.id)) return message.channel.send("The user already doesn't have that role.");
    await(rMember.removeRole(gRole.id));

    try{
        await rMember.send(`The role ${gRole.name} has been removed from you in ${message.guild.name}.`);
        message.channel.send(`The role ${gRole.name} has been removed from <@${rMember.id}>.`);
    }catch(e){
        console.log(e.stack);
    }

}


module.exports.help = {
    name: "removerole"
}