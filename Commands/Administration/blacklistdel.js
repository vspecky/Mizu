const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');
negReply = 'That string is not blacklisted. To blacklist a string, use the command `j!blacklistadd <string>`.';

module.exports.run = async (bot, message, args) => {

    let blacklisted = message.content.slice(message.content.indexOf(" ") + 1);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
        if(!res.blacklist || !res.blacklist.includes(blacklisted)) return message.channel.send(negReply);
        else {
            res.blacklist.splice(res.blacklist.indexOf(blacklisted));

            res.save().catch(err => console.log(err));

            return message.channel.send(`'${blacklisted}' was removed from the list of blacklisted strings.`);
        }
        
    });

    

}

module.exports.config = {
    name: 'blacklistdel'
}