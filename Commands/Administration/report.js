const { RichEmbed } = require("discord.js");
let setsObj = require('../../Handlers/settings.js').settings;

module.exports.run = async(bot, message, args) => {

    const settings = setsObj();

    const rChannel = message.guild.channels.get(settings.logChannels.reportChannel);

    if(args.length == 0 && rChannel){
        message.delete();
        message.channel.send("I have DM'ed you to collect the report. You may also use `.report @User <Reason>` to make a report.");
        message.author.send("Please send your report here in a single message below 1000 characters in length. Provide the tag of the User, Reason and Evidence(optional). This instance shall expire in 120 seconds")
        .then((rMsg) => {
            rMsg.channel.awaitMessages(res => {
                if(res.author.id != bot.user.id){
                    
                const dmrEmbed = new RichEmbed()
                .setColor(settings.defaultEmbedColor)
                .setTitle('User Report (Type: DM)')
                .addField('Reporter :', `<@${message.author.id}> ID: ${message.author.id}`)
                .addField('Report Content:', res.content)
                .setTimestamp();

                rMsg.channel.send('Your report has been received. You may be contacted for further information.');

                rChannel.send(dmrEmbed);

                return res.content;

                }
            }, {
                max: 1,
                time: 120000,
                errors: ['time']
            }).catch(() =>{
                rMsg.channel.send('This instance has expired.');
            });
        }).catch(err => console.log(err));

        return;
    }

    const rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rUser || `${rUser}` == `${message.author}`){
        message.delete().catch(O_o=>{});
        return message.channel.send("You cannot report non-existent users or yourself.");
    }

    
    const rReason = args.slice(1).join(' ');
    if(!rReason){
        message.delete().catch(O_o=>{});
        return message.channel.send("Please specify a reason.");
    }


    const reportEmbed = new RichEmbed()
    .setTitle("User Report")
    .setColor("#8E5BC5")
    .setThumbnail(rUser.user.displayAvatarURL)
    .addField("Reported User :", `${rUser} ID: ${rUser.id}`)
    .addField("Report Made By :", `${message.author} ID: ${message.author.id}`)
    .addField("In Channel :", message.channel)
    .setTimestamp()
    .addField("Reason :", rReason);

    
    
    message.delete().catch(O_o=>{});
    if(rChannel) rChannel.send(reportEmbed);

}

module.exports.config = {
    name: "report",
    usage: "```.report (Optional: <@User/UserID> <Reason>)```",
    desc: 'Reports the specified user for the specified reason or DMs the command user for the report.'
}