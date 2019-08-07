const discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{

    if(!message.member.hasPermission("MANAGE_SERVER")) return;

    let chanid = args[0].slice(2, 20);

    let aChannel = message.guild.channels.find(`id`, `${chanid}`);

    let aMsgArr = message.content.split(" ");

    let aMsgArr1 = aMsgArr.slice(2, aMsgArr.length + 1);

    let aMessage = aMsgArr1.join(" ");


    aChannel.send(aMessage);

}

module.exports.help = {
    name: "asay",
    usage: "j!asay #channel message"
}