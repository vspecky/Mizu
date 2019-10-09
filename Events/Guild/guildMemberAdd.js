const NewMemberUtils = require('../../Utils/NewMemberUtils.js');
const Utils = new NewMemberUtils();

/**
 * 'guildMemberAdd' event Callback. Includes the Anti-Raid system and Welcoming system.
 * Check NewMemberUtils for more info
 * @param {Client} Mizu
 * @param {GuildMember} member
 * @returns NOU
 */
module.exports = async (Mizu, member) => {

    if(Utils.SingleRaidCheck(member, Mizu.sets.antiRaidSettings)) return Utils.InformSingleRaid(member, Mizu.sets);
    if(Utils.MultiRaidCheck(member, Mizu.sets.antiRaidSettings)) return Utils.InformMultiRaid(Mizu.sets);
    else {
        Utils.WelcomeUser(member, Mizu.sets);
        Utils.CheckOldUser(member);
    }

}