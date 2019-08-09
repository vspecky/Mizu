/*
FOR: banner.png (Quinn's Meme Banner)

const canvas = Canvas.createCanvas(843, 120);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./Banners/banner.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(message.member.user.tag, 129, 110);

    const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL);
    ctx.drawImage(avatar, 730, 25, 71, 71);

    let attachment = new discord.Attachment(canvas.toBuffer(), 'welcome.png');

    channel.send('testing', attachment);

*/

/*

FOR: banner1.png (Gerry's Awesome Banner)

const canvas = Canvas.createCanvas(500, 135);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./Banners/banner1.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '28px Comic Sans MS';
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

*/