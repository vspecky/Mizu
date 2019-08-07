const discord = require("discord.js");
const fs = require("fs");
const category = JSON.parse(fs.readFileSync("./JSON/logchannels.json", "utf8"));

module.exports.run = async(bot,message,args) =>{

    if(message.channel.parentID != category.nsfw) return;

    let imgNo = Math.ceil(Math.random() * 6730);

    let imgQuery = imgNo.toString();

    while(imgQuery.length < 5){
        imgQuery = '0' + imgQuery;
    }

    let buttEmbed = new discord.RichEmbed()
    .setColor('#8E5BC5')
    .setTitle('Enjoy the butt!')
    .setImage(`http://media.obutts.ru/butts_preview/${imgQuery}.jpg`)

    message.channel.send(buttEmbed);

}


module.exports.help = {
    name: "butt"
}