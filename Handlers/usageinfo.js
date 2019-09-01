let setsObj = require('./settings.js').settings;
const { RichEmbed } = require('discord.js');

module.exports = ({ name, usage, note, desc }) => {
    let usageEmbed = new RichEmbed()
    .setTitle(`Usage for ${name}`)
    //.setColor(setsObj().defaultEmbedColor)
    if(usage) usageEmbed.setDescription(usage);
    if(desc) usageEmbed.addField('Description', `${desc}`);
    if(note) usageEmbed.setFooter(note);

    return usageEmbed;
}