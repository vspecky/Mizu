const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const expschema = require('../../models/expSchema.js');

module.exports.run = async (Mizu, message, args) => {

    const cmdMem = await message.guild.fetchMember(message.author);

    if(!cmdMem.hasPermission(['ADMINISTRATOR'])) return;

    if(args.length != 2 || isNaN(args[1])) return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(Mizu.sets.defaultEmbedColor));

    const addMem = await message.guild.fetchMember(message.mentions.users.first() || args[0]);

    if(!addMem) return message.channel.send(new RichEmbed({
        description: "The member could not be found.",
        color: Mizu.sets.defaultEmbedColor
    }));

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    expschema.findOne({ UUID: addMem.id }, (err, res) => {

        if(err) console.error(err);

        res['277888888838815744'].EXPERIENCE += Number(args[1]);

        res.save().catch(err => console.error(err));

        return message.channel.send(new RichEmbed({
            description: `${args[1]} xp was added to ${addMem.user.tag}.`,
            color: Mizu.sets.defaultEmbedColor
        }));

    });

}

module.exports.config = {
    name: 'addxp',
    usage: "```.addxp <@User/UserID> <Amount>```",
    desc: 'Adds the designated amount of exp to the specified user.'
}