const { RichEmbed } = require('discord.js');

module.exports.run = async (bot,message,args) =>{

    const settings = bot.sets;

    if(args.length) return message.reply(new RichEmbed(bot.usages.get(exports.config.name)).setColor(settings.defaultEmbedColor))

    let eventsRole = message.guild.roles.get(settings.eventsRole);

    if(!eventsRole) return message.channel.send(new RichEmbed({
        description: "Couldn't find the events role.",
        color: settings.defaultEmbedColor
    }))
    
    await eventsRole.edit({ mentionable : true });

    await message.channel.send(`<@&${eventsRole.id}>`);

    await eventsRole.edit({ mentionable : false });

    return message.delete();
}

module.exports.config = {
    name: 'eventsping',
    usage: "```.eventsping```",
    desc: 'Mentions the events role.',
    note: 'Make sure an events role has been set for the guild.'
}