const { RichEmbed } = require('discord.js');
const { connect } = require('mongoose');
const setschema = require('../../models/settingsSchema.js');

module.exports.run = async (Mizu, message, args) => {

    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(Mizu.sets.defaultEmbedColor);

    if(args.length != 2) return message.reply(usageEmbed);

    if(!Array.from(Mizu.commands.keys()).includes(args[0])) return message.channel.send(new RichEmbed({
        description: "That command does not exist.",
        color: Mizu.sets.defaultEmbedColor
    }));

    const role = message.guild.roles.get(args[1]);

    if(!message.guild.roles.get(args[1])) return message.channel.send(new RichEmbed({
        description: "The specified role couldn't be found.",
        color: Mizu.sets.defaultEmbedColor
    }));

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: Mizu.sets.serverID }, (err, res) => {
        if(err) console.log(err);

        if(!res.commandSettings.roleRestrictedCommands) res.commandSettings.roleRestrictedCommands = {};

        res.commandSettings.roleRestrictedCommands[args[0]] = role.id;

        res.save().catch(err => console.log(err));

        return message.channel.send(new RichEmbed({
            description: `The role restriction for the '${args[0]}' command was set to ${role.name}.`,
            color: Mizu.sets.defaultEmbedColor
        }));
    });

}

module.exports.config = {
    name: "restrictcmd",
    usage: "```.restrictcmd <CommandName> <RoleID>```",
    desc: "Blocks the specified command for those whose highest role is lower in the role hierarchy than the provided role."
}