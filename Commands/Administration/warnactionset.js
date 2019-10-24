const { connect } = require('mongoose');
let setschema = require('../../models/settingsSchema.js');
const { RichEmbed } = require('discord.js');
const setsObj = require('../../Handlers/settings.js').settings;
const ms = require('ms');
const actions = ['mute', 'kick', 'ban', 'del'];

module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args[0] || !args[1] || isNaN(args[0]) || !isNaN(args[1]) || args.length > 3 || (args[2] && !ms(args[2]))) return message.reply(usageEmbed);

    const action = args[1].toLowerCase();

    if(!actions.includes(action)) return message.reply(usageEmbed);

    connect('mongodb://localhost/RATHMABOT', {
        useNewUrlParser: true
    });

    setschema.findOne({ serverID: settings.serverID }, (err, res) => {
        if(err) console.log(err);

        if(!res.warnPunishments) res.warnPunishments = {};

        if(args[1] != 'del'){
            // If the Action argument != del, set the warning action with the provided parameters
            res.warnPunishments[`${args[0]}warn`] = {};
            res.warnPunishments[`${args[0]}warn`].action = action;
            if(args[2]) res.warnPunishments[`${args[0]}warn`].timeout = ms(args[2]);
            else res.warnPunishments[`${args[0]}warn`].timeout = 'permanent';

            res.save().catch(err => console.log(err));

            let embed = new RichEmbed().setColor(settings.defaultEmbedColor)
            .setTitle("Warn Action Added");
            // Confirmation message
            let desc = '';
            desc = desc + `**Warn Count:** ${args[0]}\n**Action:** ${args[1]}`
            if(args[2]) desc = desc + `\n**Timeout:** ${ms(ms(args[2]), { long: true })}`;
            embed.setDescription(desc);
            return message.channel.send(embed);
        } else {
            if(res.warnPunishments[`${args[0]}warn`]) {
                // If the Action argument is 'del' and if the action for the warncount specified exists
                delete res.warnPunishments[`${args[0]}warn`];
                res.save().catch(err => console.log(err));
                return message.channel.send(new RichEmbed({
                    description: `The action for ${args[0]} warning(s) has been deleted.` 
                }).setColor(settings.defaultEmbedColor));
            } else {
                // If the action argument is del but the action for the specified warncount does not exist
                return message.channel.send(new RichEmbed({ 
                    description: `No action has been set for ${args[0]} warning(s).` 
                }).setColor(settings.defaultEmbedColor));
            }
        }     
    });

}

module.exports.config = {
    name: 'warnactionset',
    usage: ".warnactionset <NoOfWarns> <Action> <Timeout(optional)>",
    desc: "Allows customization of actions taken at different warning levels.",
    note: "Valid actions: Kick, Mute, Ban"
}