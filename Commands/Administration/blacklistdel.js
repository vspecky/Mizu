const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
negReply = 'That string is not blacklisted. To blacklist a string, use the command `j!blacklistadd <string>`.';
let setsObj = require('../../Handlers/settings.js').settings;
const possArr = ['.blacklistdel', ' ']; 

module.exports.run = async (bot, message, args) => {

    settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    let blacklisted = message.content.slice(message.content.indexOf(" ") + 1);

    if(!blacklisted || possArr.includes(blacklisted)) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(!res.blacklist || !res.blacklist.includes(blacklisted)) return message.channel.send(negReply);
        else {
            res.blacklist.splice(res.blacklist.indexOf(blacklisted));

            res.save().catch(err => console.log(err));

            return message.channel.send(`'${blacklisted}' was removed from the list of blacklisted strings.`);
        }
        
    });  

}

module.exports.config = {
    name: 'blacklistdel',
    usage: '```.blacklistdel <Word(s)>```',
    desc: "Removes a word or a string of words from the chat filter.",
    note: "There should only be one space between the command and the Word(s)"
}