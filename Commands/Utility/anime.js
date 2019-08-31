const discord = require("discord.js");
const scraper = require("animescraper");

module.exports.run = async(bot,message,args) =>{
    
    body = await scraper.searchAnime(`${args}`);

    anime = await scraper.getAnime(`${body[0].link}`)

    let animeEmbed = new discord.RichEmbed()
    .setColor("#8E5BC5")
    .setTitle(`Anime: ${anime.title}`)
    .setURL(`${scraper.animeUrl}${body[0].link}`)
    .setThumbnail(`https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/11102649_944013775632587_553205677214199318_n.png?_nc_cat=1&_nc_oc=AQmginOMXXSGXU_y3fNliHEovMZGWn16qoa-AB-PQ4CMocVnVq0SZNDsFnWCyXRI5mA&_nc_ht=scontent-bom1-1.xx&oh=e25633a138ee3637ba3753d16d7ea90d&oe=5DB2E0C5`)
    .addField('Episodes :', anime.episodes, true)
    .addField('Score :', anime.score, true)
    .addField('Ranked :', anime.ranked, true)
    .addField('Popularity :', anime.popularity, true)
    .setDescription(`**Synopsis** : ${anime.description}`)
    .setFooter('Click the title to view more on MAL')
    .setImage(anime.image);

    message.channel.send(animeEmbed);

    
}

module.exports.config = {
    name: "anime"
}