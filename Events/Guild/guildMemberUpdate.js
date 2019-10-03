const UserupdateUtils = require('../../Utils/UserupdateUtils.js');
const Utils = new UserupdateUtils();

/**
 * 'guildMemberUpdate' event Callback
 *
 * @param {Client} Mizu
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 */
module.exports = async (Mizu, oldMember, newMember) => {

    if(oldMember.roles.size !== newMember.roles.size) Utils.RoleUpdate(oldMember.roles, newMember.roles, Mizu.sets, newMember);
    if(oldMember.nickname !== newMember.nickname) Utils.NicknameUpdate(oldMember.nickname, newMember.nickname, newMember, Mizu.sets);

}