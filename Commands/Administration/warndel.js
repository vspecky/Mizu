const discord = require('discord.js');
const Warning = require('../../models/warnSchema.js');
const mongoose = require('mongoose');

module.exports.run = async (bot,message,args) => {

    if(args[0]){
        wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!wUser) return message.channel.send("Invalid user argument.");
    }

    if(!args[1] || isNaN(args[1])) {
        return message.channel.send('Please provide the index number of the warning.');
    }

    let wIndex = args[1];

    mongoose.connect('mongodb://localhost/Warnings', {
        useNewUrlParser: true
    });

    Warning.findOne({ UserID: wUser.id }, (err, warn) => {
        if(err) console.log(err);

        if(wIndex > warn.Logs.length || wIndex <= 0) {
            return message.channel.send('That warning does not exist.')
        }

        warn.DelLogs.push(warn.Logs[wIndex - 1]);
        warn.Logs.splice(wIndex - 1, 1);

        if (warn.DelLogs.length > 3) warn.DelLogs.shift();

        message.channel.send('The warning was successfully cleared.');

        warn.save().catch(err => console.log(err));
    });

}

module.exports.help = {
    name: 'warndel'
}