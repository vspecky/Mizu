const discord = require('discord.js');
const Warning = require('../../models/warnSchema.js');
const mongoose = require('mongoose');

module.exports.run = async (bot,message,args) => {

    mongoose.connect('mongodb://localhost/Warnings', {
        useNewUrlParser: true
    });

    let wUser;

    if(args[0]){
        wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!wUser) return message.channel.send("Invalid user argument.");
    }else{
        wUser = message.member;
    }

    Warning.findOne({ UserID: wUser.id }, (err, warn) => {
        if(err) console.log(err);
        if(warn.Logs.length == 0 && warn.DelLogs.length == 0){
            return message.channel.send('That user has no warns.');
        }else{
            let logEmbed = new discord.RichEmbed()
            .setColor(wUser.displayHexColor)
            .setAuthor(`Warn Logs: ${wUser.user.tag}`, `${wUser.user.displayAvatarURL}`)
            .setFooter(`Active Warnings = ${warn.Logs.length}`);

            if(warn.Logs.length > 0){
                for(let i = 0; i < warn.Logs.length; i++){
                    logEmbed.addField(`${i + 1}. ${warn.Logs[i].time}`, `${warn.Logs[i].reason}`);
                }
            }

            if(warn.DelLogs.length > 0){
                logEmbed.addBlankField();
                let wClears = ``;
                for(let i = 0; i< warn.DelLogs.length; i++){
                    wClears = wClears + `${i+1}. ${warn.DelLogs[i].time}:\n${warn.DelLogs[i].reason}\n`;
                }
                logEmbed.addField('Recent Cleared Warns:', `~~${wClears}~~`);
            }

            message.channel.send(logEmbed);

            warn.save().catch(err => console.log(err));

        }
    });

}

module.exports.help = {
    name: 'warnlog'
}