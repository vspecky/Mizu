const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    // j!unmute @user

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute || `${toMute}` == `${message.author}`){
        message.delete().catch(O_o=>{});
        return message.channel.send("Invalid user argument.");
    }
    
   

    if(!message.member.hasPermission("MUTE_MEMBERS")){
        return message.channel.send(`${message.author} You aren't Mod-sama! :flushed:`);
    }


    let umIcon = toMute.user.displayAvatarURL;
    let muteRole = message.guild.roles.find(`name`, "muted");
    let tmuteRole = message.guild.roles.find(`name`, "tempmuted");


    if(toMute.roles.has(tmuteRole.id)){
        toMute.removeRole(tmuteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted.`);
    }
    else if(toMute.roles.has(muteRole.id)){
        toMute.removeRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted.`);
    }
    else{
        return message.channel.send("That user is not muted.");
    }


    let unMuteEmbed = new discord.RichEmbed()
    .setDescription("User Unmute")
    .setColor("#8E5BC5")
    .setThumbnail(umIcon)
    .addField("Unmuted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Unmuted By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setFooter(message.createdAt);

    let tmChannel = message.guild.channels.find(`name`, "moderation");
    if(!tmChannel){
        return message.channel.send("Couldn't find the moderation channel.");
    }

    
    message.delete().catch(O_o=>{});
    tmChannel.send(unMuteEmbed);

    return;

}

module.exports.config = {
    name: "unmute"
}