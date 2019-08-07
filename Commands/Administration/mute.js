const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    // j!mute @user reason

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute || `${toMute}` == `${message.author}`){
        message.delete().catch(O_o=>{});
        return message.channel.send("Invalid user argument.");
    }
    
   

    if(!message.member.hasPermission("MUTE_MEMBERS")){
        return message.channel.send(`${message.author} You aren't Mod-sama! :flushed:`);
    }

    if(toMute.hasPermission("MUTE_MEMBERS")){
        return message.channel.send(`${message.author} Why u wanna mute Mod-sama? :pensive:`);
    }

    let mIcon = toMute.user.displayAvatarURL;

    let muteRole = message.guild.roles.find(`name`, "muted");

    //start of create role
    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name: "muted",
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


    let mReason = args.join(" ").slice(22);
    if(!mReason){
        message.delete().catch(O_o=>{});
        return message.channel.send("Please specify a reason.");
    }


    if(toMute.roles.has(muteRole.id)){
        message.delete().catch(O_o=>{});
        message.channel.send("That user is already muted");
        return;
    }
    else{
        toMute.addRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been muted.`);
    }
   


    let muteEmbed = new discord.RichEmbed()
    .setDescription("User Mute")
    .setColor("#8E5BC5")
    .setThumbnail(mIcon)
    .addField("Muted User :", `<@${toMute.id}> ID: ${toMute.id}`)
    .addField("Muted By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .addField("Time :", message.createdAt)
    .addField("Reason :", mReason);

    let mChannel = message.guild.channels.find(`name`, "moderation");
    if(!mChannel){
        return message.channel.send("Couldn't find the moderation channel.");
    }

    
    message.delete().catch(O_o=>{});
    mChannel.send(muteEmbed);
    return;

}

module.exports.help = {
    name: "mute"
}