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

    let reportEmbed = new discord.RichEmbed()
        .setDescription("User Warning")
        .setColor("#8E5BC5")
        .setThumbnail(rIcon)
        .addField("Warned User :", `${wUser} ID: ${wUser.id}`)
        .addField("Warned By :", `${message.author} ID: ${message.author.id}`)
        .addField("In Channel :", message.channel)
        .setFooter(message.createdAt)
        .addField("Reason :", wReason);
    //.addField("Total No. of Warnings :", warns[wUser.id].warns);


    let infoEmbed = new discord.RichEmbed()
        .setColor("#8E5BC5")
        .addField("Warned User :", `${wUser} ID: ${wUser.id}`)
        .addField("Reason :", wReason)
        //.addField("Total No. of Warnings :", warns[wUser.id].warns)
        .setFooter(message.createdAt);

    let userNotif = new discord.RichEmbed()
        .setColor("#8E5BC5")
        .addField(`You have been warned in ${message.guild.name} for the following reason :`, wReason)
        //.addField(`Your total amount of warnings so far is ${warns[wUser.id].warns}.`)
        .setFooter(message.createdAt);



    message.delete().catch(O_o => { });
    rChannel.send(reportEmbed);
    message.channel.send(infoEmbed);
    wUser.send(userNotif);

    mongoose.connect('mongodb://localhost/Warnings');

    let warnings = Warning.findOne({ UserID: wUser.id });

    if (!warnings) {
        warnings = new Warning({
            _id: message.id,
            Tag: wUser.user.tag,
            UserID: wUser.id,
            Logs: [],
            DelLogs: []
        });
    }

    warnings.Logs.push({
        reason: `${wReason}`,
        time: `${message.createdAt}`
    });

    let muteRole = message.guild.roles.find('name', 'muted').id;

    switch (warnings.Logs.length) {
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
            message.guild.ban(warnings.UserID);

            setTimeout(() => {
                message.guild.unban(warnings.UserID);
            }, 604800000);
            break;
        
        case 6:
            message.guild.ban(warnings.UserID);

    }

    warnings.save().catch(err => console.log(err));

    
    return;


}


module.exports.help = {
    name: "warn"
}