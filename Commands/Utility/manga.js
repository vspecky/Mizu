const { RichEmbed } = require("discord.js");
const scraper = require("mangascraper");

module.exports.run = async(bot,message,args) =>{

    const settings = bot.sets;
    
    let usageEmbed = new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);

    if(!args.length) return message.reply(usageEmbed);
    
    body = await scraper.searchManga(`${args}`);

    manga = await scraper.getManga(`${body[0].alink}`)

    let mangaEmbed = new RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Manga: ${manga.title}`)
    .setURL(`${scraper.mangaUrl}${body[0].link}`)
    .setThumbnail(`https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/11102649_944013775632587_553205677214199318_n.png?_nc_cat=1&_nc_oc=AQmginOMXXSGXU_y3fNliHEovMZGWn16qoa-AB-PQ4CMocVnVq0SZNDsFnWCyXRI5mA&_nc_ht=scontent-bom1-1.xx&oh=e25633a138ee3637ba3753d16d7ea90d&oe=5DB2E0C5`)
    .addField('Score :', manga.score, true)
    .addField('Type :', manga.type, true)
    .addField('Ranked :', manga.ranked, true)
    .addField('Popularity :', manga.popularity, true)
    .setDescription(`**Synopsis** : ${manga.synopsis}`)
    .setFooter('Click the title to view more on MAL')
    .setImage(manga.image);

    message.channel.send(mangaEmbed);

    
}

module.exports.config = {
    name: "manga",
    usage: "```.manga <NameOfMange>```",
    desc: 'Posts information about the specified manga.'
}