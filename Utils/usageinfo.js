const { RichEmbed } = require('discord.js');

/**
 * Function that takes in information about the command and spits out its Usage Embed
 *
 * @param {CommandInfo} { name, usage, note, desc, aliases }
 * @returns Usage Embed
 */
module.exports = ({ name, usage, note, desc, aliases }) => {
    let usageEmbed = new RichEmbed()
    .setTitle(`Command: ${name}`)
    if(usage) usageEmbed.addField('Usage', `\`\`\`${usage}\`\`\``);
    if(desc) usageEmbed.addField('Description', desc);
    if(note) usageEmbed.setFooter(note);
    if(aliases) usageEmbed.setDescription(`Aliases: ${aliases.join(', ')}`);

    return usageEmbed;
}