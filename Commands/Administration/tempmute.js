const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) =>{

    // j!tempmute @user time reason

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!message.member.hasPermission("MUTE_MEMBERS")){
        return message.channel.send(`${message.author} You aren't Mod-sama! :flushed:`);
    }

    if(toMute.hasPermission("MUTE_MEMBERS")){
        return message.channel.send(`${message.author} Why u wanna tempmute Mod-sama? :pensive:`);
    }

    
    if(!toMute || `${toMute}` == `${message.author}`){
        message.delete().catch(O_o=>{});
        return message.channel.send("You cannot tempmute non-existent users or yourself.");
    }
    
   

    

    let tmIcon = toMute.user.displayAvatarURL;

    let muteRole = message.guild.roles.find(`name`, "tempmuted");

    //start of create role
    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name: "tempmuted",
                color: "#8B0000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) =>{
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    ATTACH_FILES: false
                });
                
            });

        }catch(e){
            console.log(e.stack);
        }
    }
    //end of create role 

    let muteTime = args[1];
    if(!muteTime){
        return message.channel.send("Please specify a time");
    }

    let tmReason = args.join(" ").slice(23 + muteTime.length);
    if(!tmReason){
        message.delete().catch(O_o=>{});
        return message.channel.send("Please specify a reason.");
    }

    if(toMute.roles.has(`name`, "tempmuted")){
        message.delete().catch(O_o=>{});
        message.channel.send(`That user is already tempmuted for ${ms(ms(muteTime))}`);
        return;
    }
    else{
        toMute.addRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);
    }
   

    setTimeout(function(){
        toMute.removeRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted.`);
    }, ms(muteTime));


    let tempMuteEmbed = new discord.RichEmbed()
    .setDescription("User Temp Mute")
    .setColor("#8E5BC5")
    .setThumbnail(tmIcon)
    .addField("Temp Muted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Temp Muted By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setFooter(message.createdAt)
    .addField("Reason :", tmReason);

    let tmChannel = message.guild.channels.find(`name`, "moderation");
    if(!tmChannel){
        return message.channel.send("Couldn't find the moderation channel.");
    }

    
    message.delete().catch(O_o=>{});
    tmChannel.send(tempMuteEmbed);

    return;

}

module.exports.config = {
    name: "tempmute"
}