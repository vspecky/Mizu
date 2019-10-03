const MessageUtils = require('../../Utils/MessageUtils.js');
const Utils = new MessageUtils();

/**
 * 'message' Event Callback
 *
 * @param {Client} Mizu
 * @param {Message} message
 * @returns
 */
module.exports = async (Mizu, message) => {

    if (message.author.Mizu) return;
    if (message.channel.type === "dm") return Utils.ModMail(message, Mizu);

    if(Utils.AntiSpam(message, Mizu.sets)) return;

    const prefix = Utils.PrefixCheck(message.content, Mizu.sets);

    if(prefix) return Utils.Command(message, Mizu, prefix);
    else if(Utils.ProfanityFilter(message.content, Mizu.sets)) return message.delete();
    else return Utils.Experience(message.author, Mizu.sets);

}