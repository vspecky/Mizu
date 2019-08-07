const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
     // j!ban @user reason

     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!bUser || `${bUser}` == `${message.author}`){
         message.delete().catch(O_o=>{});
         return message.channel.send("You cannot ban non-existent users or yourself.");
     }
     
     let bReason = args.join(" ").slice(22);
     if(!bReason){
         message.delete().catch(O_o=>{});
         return message.channel.send("Please specify a reason.");
     }

     if(!message.member.hasPermission("BAN_MEMBERS")){
         return message.channel.send(`${message.author} You aren't Mod-sama! :flushed:`);
     }

     if(bUser.hasPermission("BAN_MEMBERS")){
         return message.channel.send(`${message.author} Why u wanna ban Mod-sama? :pensive:`);
     }

     let bIcon = bUser.user.displayAvatarURL;

     let banEmbed = new discord.RichEmbed()
     .setDescription("User Ban")
     .setColor("#8E5BC5")
     .setThumbnail(bIcon)
     .addField("Banned User :", `<@${bUser}> ID: ${bUser.id}`)
     .addField("Banned By :", `${message.author} ID: ${message.author.id}`)
     .addField("In Channel :", message.channel)
     .addField("Time :", message.createdAt)
     .addField("Reason :", bReason);

     let bChannel = message.guild.channels.find(`name`, "moderation");
     if(!bChannel){
         return message.channel.send("Couldn't find the moderation channel.");
     }

     message.guild.member(bUser).ban(bReason);
     
     message.delete().catch(O_o=>{});
     bChannel.send(banEmbed);

}

module.exports.help = {
    name: "ban"
}