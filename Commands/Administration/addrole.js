const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
    
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the permissions to do that.");

    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.channel.send("Couldn't find that user.");

    let role = args.slice(1).join(" ");
    if(!role) return message.channel.send("Please specify a role.");

    let gRole = message.guild.roles.find(r => r.name.toLowerCase() == role.toLowerCase());
    if(!gRole) return message.channel.send("That role does not exist.");

    if(rMember.roles.has(gRole.id)) return message.channel.send("The user already has that role.");
    await rMember.addRole(gRole.id); 

    try{
        await rMember.send(`You have been assigned the role ${gRole.name} in ${message.guild.name}.`);
        message.channel.send(`<@${rMember.id}> has been assigned the role ${gRole.name}.`);
    }catch(e){
        console.log(e.stack);
    }

}


module.exports.config = {
    name: "addrole",
    aliases: ['ar']
}