const { RichEmbed } = require('discord.js');
let exparr;
let expObject = require('../../Handlers/settings.js').experience;

module.exports.run = async (Mizu, message, args) => {

    if(isNaN(args[0]) && args[0]) return message.reply('Bad Usage.');

    if(args[0] && !exparr[args[0] * 10]) return message.reply(`Please provide a page number between 1-${Math.floor(exparr.length/10)}.`);

    let pageNo = args[0] || 1;

    message.channel.send(getWeeklyEmbed(pageNo))
    .then(async msg => {

        await msg.react(`⬅`);
        await msg.react('➡');

        const reactfilter = (reaction, user) => (reaction.emoji.name === `➡` || reaction.emoji.name === `⬅`) && user.id === message.author.id;

        const collector = msg.createReactionCollector(reactfilter, { time: 30000 });

        collector.on('collect', reaction => {
            if(reaction.emoji.name === `⬅` && pageNo == 1) reaction.remove(message.author);
            else if(reaction.emoji.name === `➡` && pageNo == Math.floor(exparr.length/10)) reaction.remove(message.author);
            else if(reaction.emoji.name === `➡`) {
                pageNo++;
                reaction.remove(message.author);
                msg.edit(new RichEmbed(getWeeklyEmbed(pageNo)));
            }
            else if(reaction.emoji.name === `⬅`) {
                pageNo--;
                reaction.remove(message.author);
                msg.edit(new RichEmbed(getWeeklyEmbed(pageNo)));
            }
        });

        collector.on('end', collected => {
            msg.reactions.forEach(reaction => {
                reaction.remove(Mizu.user);
            });
        });

    });

}

const getWeeklyEmbed = pageNumber => {

    let hdr = pageNumber * 10; // Highest Displayed Rank

    let xpembed = new RichEmbed()
        .setTitle('OtakuOnsen Weekly Leaderboard')
        .setColor('#8E5BC5')
        .setFooter(`Page ${pageNumber}/${Math.floor(exparr.length/10)}`);

    for (let i = (hdr - 10); i < hdr; i++) {
        xpembed.addField(`Rank ${i+1} - ${exparr[i]['LAST KNOWN USERNAME'] || exparr[i].UUID}`,
        `Weekly Experience - ${exparr[i]['277888888838815744']['WEEKLY EXPERIENCE'] || 0}xp`);
    }

    return xpembed;

}

setInterval(() => {
    exparr = expObject().weeklyArray;
}, 10000);

module.exports.config = {
    name: 'weeklylb',
    aliases: ['lbw']
}