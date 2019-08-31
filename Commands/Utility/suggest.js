const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args[0]) {
        return message.reply('Please provide a suggestion along with the command.');
    } else {
        let sChannel = message.guild.channels.find(c => c.name == 'privtest');
        let suggestion = args.join(" ");

        let sEmbed = new RichEmbed()
        .setAuthor(`Suggestion by ${message.member.nickname || message.author.username}`, message.author.displayAvatarURL)
        .setColor(message.member.displayHexColor)
        .setDescription(suggestion)
        .setFooter(`Suggested by ${message.author.tag} (${message.author.id})`);

        return sChannel.send(sEmbed)
        .then(async msg => {
            await msg.react(`✅`);
            msg.react(`❎`);
        });

    }

}

module.exports.config = {
    name: 'suggest'
}