const discord = require('discord.js');
const vcperks = require(`F:\\BotCode\\Jun\\index.js`);
const superagent = require('superagent');
const Canvas = require('canvas');

module.exports.run = async (bot,message,args) =>{

    let channel = message.guild.channels.find('name', 'privtest');

    const canvas = Canvas.createCanvas(500, 135);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./Banners/banner1.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '28px bold Calibri';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(message.member.user.tag, 101, 98);

    ctx.beginPath();
    ctx.arc(51.5, 85.5, 31.5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL);
    ctx.drawImage(avatar, 20, 54, 63, 63);

    let attachment = new discord.Attachment(canvas.toBuffer(), 'welcome.png');

    channel.send('testing', attachment);
}

module.exports.help = {
    name: "test"
}