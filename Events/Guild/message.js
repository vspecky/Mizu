const MessageUtils = require('../../Utils/MessageUtils.js');
const Utils = new MessageUtils();

/**
 * 'message' Event Callback
 *
 * @param {Client} bot
 * @param {Message} message
 * @returns
 */
module.exports = async (bot, message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return Utils.ModMail(message, bot);

    if(Utils.AntiSpam(message, bot.sets)) return;

    const prefix = Utils.PrefixCheck(message.content, bot.sets);

    if(prefix) return Utils.Command(message, bot, prefix);
    else if(Utils.ProfanityFilter(message.content, bot.sets)) return message.delete();
    else return Utils.Experience(message.author, bot.sets);

}