const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot,message,args) =>{


    setInterval(() => {
        if(message.channel.parentID != category.nsfw) return;

        let imgNo = Math.ceil(Math.random() * 13990);

        let imgQuery = imgNo.toString();

        while(imgQuery.length < 5){
            imgQuery = '0' + imgQuery;
        }


        let boobEmbed = new discord.RichEmbed()
        .setColor('#8E5BC5')
        .setTitle('Enjoy the boobs!')
        .setImage(`http://media.oboobs.ru/boobs_preview/${imgQuery}.jpg`)

        message.channel.send(boobEmbed);   
    }, 5000);

    

}


module.exports.config = {
    name: "boobs"
}