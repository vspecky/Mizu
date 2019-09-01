const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');
let setsObj = require('../../Handlers/settings.js').settings;
const possArr = ['.blacklistadd', ' ']

module.exports.run = async (bot, message, args) => {

    settings = setsObj();
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    let blacklisted = message.content.slice(message.content.indexOf(" ") + 1);

    if(!blacklisted || possArr.includes(blacklisted)) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: setsObj().serverID }, (err, res) => {
        if(!res.blacklist) res.blacklist = [];

        if(res.blacklist.includes(blacklisted)) return message.channel.send('That string is already blacklisted.');
        else {
            res.blacklist.push(blacklisted);

            res.save().catch(err => console.log(err));

            return message.channel.send(`'${blacklisted}' was added to the list of blacklisted strings.`);
        }
        
    });

    

}

module.exports.config = {
    name: 'blacklistadd',
    usage: "```.blacklistadd <Word(s)>```",
    desc: "Adds a word or a string of words to the chat filter.",
    note: "There should only be one space between the command and the Word(s)"
}