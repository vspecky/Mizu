const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
     // j!kick @user reason

     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser || `${kUser}` == `${message.author}`){
         message.delete().catch(O_o=>{});
         return message.channel.send("You cannot kick non-existent users or yourself.");
     }
     
     let kReason = args.join(" ").slice(22);
     if(!kReason){
         message.delete().catch(O_o=>{});
         return message.channel.send("Please specify a reason.");
     }

     if(!message.member.hasPermission("KICK_MEMBERS")){
         return message.channel.send(`${message.author} You aren't Mod-sama! :flushed:`);
     }

     if(kUser.hasPermission("KICK_MEMBERS")){
         return message.channel.send(`${message.author} Why u wanna kick Mod-sama? :pensive:`);
     }

     let kIcon = kUser.user.displayAvatarURL;

     let kickEmbed = new discord.RichEmbed()
     .setDescription("User Kick")
     .setColor("#8E5BC5")
     .setThumbnail(kIcon)
     .addField("Kicked User :", `<@${kUser}> ID: ${kUser.id}`)
     .addField("Kicked By :", `${message.author} ID: ${message.author.id}`)
     .addField("In Channel :", message.channel)
     .setFooter(message.createdAt)
     .addField("Reason :", kReason);

     let kChannel = message.guild.channels.find(`name`, "moderation");
     if(!kChannel){
         return message.channel.send("Couldn't find the moderation channel.");
     }

     message.guild.member(kUser).kick(kReason);
     
     message.delete().catch(O_o=>{});
     kChannel.send(kickEmbed);

}

module.exports.help = {
    name: "kick"
}