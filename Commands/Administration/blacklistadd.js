const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');
const possArr = ['.blacklistadd', ' ']

module.exports.run = async (Mizu, message, args) => {

    settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    let blacklisted = message.content.split(' ').slice(1).join(' ');

    if(!blacklisted || possArr.includes(blacklisted)) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: Mizu.sets.serverID }, (err, res) => {
        if(!res.blacklist) res.blacklist = [];

        if(res.blacklist.includes(blacklisted)) return message.channel.send(new RichEmbed({
            color: settings.defaultEmbedColor,
            description: 'That string is already blacklisted.'
        }));
        else {
            res.blacklist.push(blacklisted);

            res.save().catch(err => console.log(err));

            return message.channel.send(new RichEmbed({
                color: settings.defaultEmbedColor,
                description: `'${blacklisted.replace(/ /g, '\t')}' was added to the list of blacklisted strings.`
            }));
        }
        
    });

    

}

module.exports.config = {
    name: 'blacklistadd',
    usage: ".blacklistadd <Word(s)>",
    desc: "Adds a word or a string of words to the chat filter.",
    note: "There should only be one space between the command and the Word(s)"
}