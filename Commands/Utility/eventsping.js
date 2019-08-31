const discord = require('discord.js');

module.exports.run = async (bot,message,args) =>{


    let eventsRole = message.guild.roles.find('name', 'events');
    
    await eventsRole.edit({ mentionable : true });

    message.channel.send(`<@&${eventsRole.id}>`);

    eventsRole.edit({ mentionable : false });

    message.delete();

    return;
}

module.exports.config = {
    name: 'eventsping'
}