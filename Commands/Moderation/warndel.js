const { RichEmbed } = require('discord.js');
const Warning = require('../../models/warnSchema.js');
const { connect } = require('mongoose');


module.exports.run = async (Mizu,message,args) => {

    if(!message.member.hasPermission(['BAN_MEMBERS'])) return;

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !args[1] || isNaN(args[1])) return message.reply(usageEmbed);

    wUser = message.guild.fetchMember(message.mentions.users.first() || args[0]);
    if(!wUser) return message.channel.send(new RichEmbed({ description: 'Invalid user argument.' }));

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    Warning.findOne({ UserID: wUser.id }, (err, warn) => {
        if(err) console.log(err);

        if(!warn) return message.channel.send(new RichEmbed({ 
            description: `${wUser.user.tag} has no active warnings.` 
        }).setColor(settings.defaultEmbedColor));

        if(args[1] > warn.Logs.length || args[1] <= 0) {
            return message.channel.send(new RichEmbed({ 
                description: `No warnings with an index of ${args[1]} found.` 
            }).setColor(settings.defaultEmbedColor));
        }
        const warning = warn.Logs[args[1] - 1];
        warn.DelLogs.push(warn.Logs[args[1] - 1]);
        warn.Logs.splice(args[1] - 1, 1);

        if (warn.DelLogs.length > 3) warn.DelLogs.shift();

        message.channel.send(new RichEmbed({ 
            description: 'Warning successfully cleared.' 
        }).setColor(settings.defaultEmbedColor));

        warn.save().catch(err => console.log(err));

        let logch = message.guild.channels.get(settings.logChannels.warnChannel);
        let logembed = new RichEmbed().setColor(settings.defaultEmbedColor)
        .setTitle(`✅Warning Cleared:`)
        .addField('Cleared For:', `${wUser.user.tag}`)
        .addField('Cleared By:', `${message.author.tag}`)
        .setFooter(new Date().toUTCString());
        
        if(logch) return logch.send(logembed);
    });

}

module.exports.config = {
    name: 'warndel',
    usage: "```.warndel <@User/UserID> <Index>```",
    desc: "Clears a user's active warning corresponding to the specified index.",
}