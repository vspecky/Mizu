const discord = require("discord.js");
const Warning = require('../../models/warnSchema.js');
const mongoose = require('mongoose');


module.exports.run = async (bot, message, args) => {

    // j!warn @user reason


    let rChannel = message.guild.channels.find(`name`, 'moderation');
    if (!rChannel) {
        return message.channel.send("Please set up a channel for warnlogs first using `j!warnlogch #channel`.");
    }

    if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return;

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!wUser) return message.channel.send("Invalid user argument.");

    if (wUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return;

    let wReason = args.join(" ").slice(22);


    let rIcon = wUser.user.displayAvatarURL;


    let infoEmbed = new discord.RichEmbed()
        .setTitle("User Warning :")
        .setColor("#8E5BC5")
        .addField("Warned User :", `${wUser} ID: ${wUser.id}`)
        .addField("Reason :", wReason)
        .setFooter(message.createdAt);

    let userNotif = new discord.RichEmbed()
        .setColor("#8E5BC5")
        .addField(`You have been warned in ${message.guild.name} for the following reason :`, wReason)
        .setFooter(message.createdAt);



    message.delete().catch(O_o => { });
    message.channel.send(infoEmbed);

    infoEmbed.addField("Warned By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setThumbnail(rIcon);

    rChannel.send(infoEmbed);
    wUser.send(userNotif);

    mongoose.connect('mongodb://localhost/Warnings', {
        useNewUrlParser: true
    });


    Warning.findOne({ UserID: wUser.id }, (err, warn) =>{
        if(err) console.log(err);
        if(!warn){
            const warning = new Warning({
                _id: message.id,
                Tag: wUser.user.tag,
                UserID: wUser.id,
                Logs : [{
                    reason: `${wReason}`,
                    time: `${message.createdAt}`
                }]
            });

            warning.save().catch(err => console.log(err));
        }else{
            warn.Logs.push({
                reason: `${wReason}`,
                time: `${message.createdAt}`
            });

            let muteRole = message.guild.roles.find('name', 'muted').id;

            if (warn.Logs.length >= 3) {
                switch (warn.Logs.length) {
                    case 3:
                        wUser.addRole(muteRole);
            
                        setTimeout(() => {
                            wUser.removeRole(muteRole);
                        }, 3600000);
            
                        message.channel.send('User has been muted for 1 hour. (Reason: 3 strikes)');
                        break;
            
                    case 4:
                        wUser.addRole(muteRole);
            
                        setTimeout(() => {
                            wUser.removeRole(muteRole);
                        }, 86400000);
            
                        message.channel.send('User has been muted for 24 hours. (Reason: 4 strikes)');
                        break;
            
                    case 5:
                        message.guild.ban(warn.UserID);
            
                        setTimeout(() => {
                            message.guild.unban(warn.UserID);
                        }, 604800000);
                        break;
            
                    case 6:
                        message.guild.ban(warn.UserID);
            
                }
            }

            warn.save().catch(err => console.log(err));
        }
    });

    

    


    return;


}


module.exports.help = {
    name: "warn"
}