const { RichEmbed } = require('discord.js');

module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets

    if(!args.length) {
        return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor));
    } else {
        const sChannel = message.guild.channels.get(settings.logChannels.suggestChannel);
        const suggestion = args.join(" ");

        let sEmbed = new RichEmbed()
        .setAuthor(`Suggestion by ${message.member.nickname || message.author.username}`, message.author.displayAvatarURL)
        .setColor(message.member.displayHexColor)
        .setDescription(suggestion)
        .setFooter(`User: ${message.author.tag} (${message.author.id})`);

        if(sChannel) return sChannel.send(sEmbed)
        .then(async msg => {
            await msg.react(`✅`);
            msg.react(`❎`);
        });

    }

}

module.exports.config = {
    name: 'suggest',
    usage: ".suggest <Suggestion>",
    desc: "Takes a suggestion from the user and posts it in a suggestions channel."
}