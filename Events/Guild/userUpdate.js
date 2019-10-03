const UserupdateUtils = require('../../Utils/UserupdateUtils.js');
const Utils = new UserupdateUtils();

/**
 * 'userUpdate' event Callback
 *
 * @param {Client} Mizu
 * @param {UserResolvable} oldUser
 * @param {UserResolvable} newUser
 */
module.exports = async (Mizu, oldUser, newUser) => {

    if(oldUser.displayAvatarURL !== newUser.displayAvatarURL) Utils.AvatarUpdate(oldUser, newUser, Mizu);
    if(oldUser.tag !== newUser.tag) Utils.TagUpdate(oldUser, newUser, Mizu);

}