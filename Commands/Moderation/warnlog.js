const { RichEmbed } = require('discord.js');
const Warning = require('../../models/warnSchema.js');
const { connect } = require('mongoose');


module.exports.run = async (Mizu,message,args) => {

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    let wUser;

    if(args[0]){
        wUser = message.guild.fetchMember(message.mentions.users.first() || args[0]);
        if(!wUser) return message.channel.send(new RichEmbed({ 
            description: 'That user does not exist.' 
        }).setColor(settings.defaultEmbedColor));
    }else{
        wUser = message.guild.fetchMember(message.author);
    }

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    Warning.findOne({ UserID: wUser.id }, (err, warn) => {
        if(err) console.log(err);
        if((warn.Logs.length == 0 && warn.DelLogs.length == 0) || !warn){
            return message.channel.send(new RichEmbed({
                description: 'That user has no warn logs.'
            }).setColor(settings.defaultEmbedColor));
        }else{
            let logEmbed = new RichEmbed()
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
                wClears = wClears.replace(/\n$/, '');
                logEmbed.addField('Cleared Warnings:', `~~${wClears}~~`);
            }

            message.channel.send(logEmbed);

            warn.save().catch(err => console.log(err));

        }
    });

}

module.exports.config = {
    name: 'warnlog',
    usage: ".warnlog <@User/UserID(optional)>",
    desc: 'Displays the warn logs of the specified user. (Command user if no specifications)'
}