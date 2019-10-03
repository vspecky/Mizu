const { connect } = require('mongoose');
const { RichEmbed } = require('discord.js');
const setschema = require('../../models/settingsSchema.js');


module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0]) return message.reply(usageEmbed);

    const role = message.guild.roles.get(args[0]);

    if(!role) return message.reply("That role doesn't exist");
    
    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        res.muteRole = args[0];

        res.save().catch(err => console.log(err));

        let embed = new RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setDescription(`Guild mute role has been set to ${role.name} (${role.id})`);
        return message.channel.send(embed);
    });

}

module.exports.config = {
    name: 'setmuterole',
    usage: '```.setmuterole <channelID>```',
    desc: 'Sets the default mute role for the guild.'
}