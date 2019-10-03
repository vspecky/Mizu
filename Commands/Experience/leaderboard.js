const { RichEmbed } = require('discord.js');
let exparr;
let expObject = require('../../Handlers/settings.js').experience;

module.exports.run = async (Mizu, message, args) => {

    const settings = Mizu.sets;

    if(isNaN(args[0]) && args.length) return message.reply(new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor));

    if(args[0] && !exparr[args[0] * 10]) return message.channel.send(new RichEmbed({
        color: settings.defaultEmbedColor,
        description: `Please provide a page number between 1-${Math.floor(exparr.length/10)}.`
    }));

    let pageNo = args[0] || 1;

    message.channel.send(getLeaderboardEmbed(pageNo))
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
                msg.edit(new RichEmbed(getLeaderboardEmbed(pageNo)));
            }
            else if(reaction.emoji.name === `⬅`) {
                pageNo--;
                reaction.remove(message.author);
                msg.edit(new RichEmbed(getLeaderboardEmbed(pageNo)));
            }
        });

        collector.on('end', collected => {
            msg.reactions.forEach(reaction => {
                reaction.remove(Mizu.user);
            });
        });

    });


}

const getLeaderboardEmbed = pageNumber => {

    let hdr = pageNumber * 10; // Highest Displayed Rank

    let xpembed = new RichEmbed()
        .setTitle('OtakuOnsen Exp Leaderboard')
        .setColor('#8E5BC5')
        .setFooter(`Page ${pageNumber}/${Math.floor(exparr.length/10)}`);

    for (let i = (hdr - 10); i < hdr; i++)  {
        let lvl = 0;
        let userexp = exparr[i]['277888888838815744'].EXPERIENCE || 0;
        while (userexp >= 0) {
            userexp -= (5 * lvl * lvl) + (50 * lvl) + 100;
            lvl++
        }
        xpembed.addField(`Rank ${i+1} - ${exparr[i]['LAST KNOWN USERNAME'] || exparr[i].UUID}`,
        `Level ${lvl-1} - ${exparr[i]['277888888838815744'].EXPERIENCE || 0}xp`);
    }

    return xpembed;

}

setInterval(() => {
    exparr = expObject().expArray;
}, 10000);

module.exports.config = {
    name: 'leaderboard',
    usage: '`.leaderboard <PageNumber(optional)>`',
    desc: 'Posts the <PageNumber>\'th page of the server exp leaderboard. (Page 1 if page number is not provided)',
    note: '', // Here goes some important information regarding the command
    module: 'experience',
    aliases: ['lb']
}