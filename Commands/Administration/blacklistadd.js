const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (bot, message, args) => {

    let blacklisted = message.content.slice(message.content.indexOf(" ") + 1);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
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
    name: 'blacklistadd'
}