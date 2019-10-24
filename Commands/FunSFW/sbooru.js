const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
var urlExists = require("url-exists");

module.exports.run = async(Mizu,message,args) =>{

    async function search(query) {
        const regex = /<img src="https:\/\/safebooru\.org\/thumbnails\/(\d+)\/thumbnail_([^.]+)\.([^"]+)" alt="([^"]+)"/g;
        const matches = [];
        const matches1 = [];
        const parse = (_, a, b, c) => matches.push({ url: `https://safebooru.org//samples/${a}/sample_${b}.${c}` });
        const parse1 = (_, a, b, c) => matches1.push({ url: `https://safebooru.org//images/${a}/${b}.${c}` });

        async function randomPageUrl(query) {
            const regex = /pid=(\d+)" alt="last page">/;
            const url = `https://safebooru.org/index.php?page=post&s=list&tags=${query}`;
            return fetch(url)
              .then(res => res.text())
              .then(text => regex.test(text) && Number(text.match(regex)[1]) || 0)
              .then(pid => `${url}&pid=${Math.floor(Math.random() * (1+ pid/40))*40}`);
          }
        
        let first = await randomPageUrl(query);

        let sampleCatcher = await fetch(first)
          .then(res => res.text())
          .then(text => text.replace(regex, parse))
          .then(() => matches);

        let imageCatcher = await fetch(first)
        .then(res => res.text())
        .then(text => text.replace(regex, parse1))
        .then(() => matches1);

        return [sampleCatcher, imageCatcher];
      }

    const settings = Mizu.sets;
    let usageEmbed = new RichEmbed(Mizu.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor);
    
    if(!args[0]) return message.channel.send(usageEmbed);

    let body = await search(args[0]);

    if(!body) return message.channel.send(new RichEmbed({
      color: settings.defaultEmbedColor,
      description: 'Invalid Tag(s).'
    }));

    let tagArray = args[0].split("+");

    let tags = tagArray.join(", ");

    let imgno = Math.floor(Math.random() * body[0].length);


    urlExists(`${body[0][imgno].url}`, (err, exists) => {
      if(exists){
        let imgEmbed = new discord.RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setTitle(`Safebooru: ${tags}`)
        .setImage(body[0][imgno].url);

        return message.channel.send(imgEmbed);

      }else{
        let imgEmbed = new discord.RichEmbed()
        .setColor(settings.defaultEmbedColor)
        .setTitle(`Safebooru: ${tags}`)
        .setImage(body[1][imgno].url);

        return message.channel.send(imgEmbed);
      }
    });



}

module.exports.config = {
    name: "sbooru",
    usage: ".sbooru <Tag(s)>",
    desc: 'Returns a random image from safebooru based on the provided tags.',
    note: "Separate the tags with '+' and use '_' for spaces."
}