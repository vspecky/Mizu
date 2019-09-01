const { RichEmbed } = require("discord.js");
let setsObject = require('../../Handlers/settings.js').settings;

module.exports.run = async(bot, message, args) =>{
     // j!ban @user reason

    if(!message.member.hasPermission("BAN_MEMBERS")) return;
    
    const settings = setsObject();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !args[1]) return message.reply(usageEmbed);

    const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!bUser || `${bUser}` == `${message.author}`) return message.reply("You cannot ban non-existent users or yourself.");

    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author} Why u wanna ban Mod-sama? :pensive:`);
     
    const bReason = args.join(" ").slice(22);
    if(!bReason) return message.reply("Please specify a reason.");

    const bIcon = bUser.user.displayAvatarURL;

    const banEmbed = new RichEmbed()
     .setTitle(`⛔ User Banned:`)
     .setColor(settings.defaultEmbedColor)
     .setThumbnail(bIcon)
     .addField("Banned User :", `<@${bUser}> ID: ${bUser.id}`)
     .addField("Banned By :", `${message.author} ID: ${message.author.id}`)
     .addField("In Channel :", message.channel)
     .addField("Time :", message.createdAt)
     .addField("Reason :", bReason);

    const bChannel = message.guild.channels.get(settings.logChannels.banChannel);

    message.guild.member(bUser).ban(bReason);
     
    message.delete().catch(O_o=>{});
    if(bChannel) bChannel.send(banEmbed);

}

module.exports.config = {
    name: "ban",
    usage: "```.ban <@User/UserID> <Reason>```",
    desc: "Bans a specified user for a specified reason.",
    note: 'Make sure a ban logs channel has been set to acquire the logs.'
}