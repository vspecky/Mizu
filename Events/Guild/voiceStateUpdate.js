let vcPerks = new Map();
let custvcadmin = new Map();

module.exports = async (bot, oldMember, newMember) => {

    if (newMember.voiceChannelID == 607592608641974324) {

        newMember.guild.createChannel(`⏱`, {
            type: 'voice',
            parent: '592207697701634062'
        }).then(async (newVC) => {
            newMember.setVoiceChannel(newVC.id);
            let name = newMember.user.username;
            if (newMember.nickname) { name = newMember.nickname; }
            if (newMember.presence.game) {
                newVC.setName(`${name}'s ${newMember.presence.game} Room`);
            } else {
                newVC.setName(`${name}'s Room`);
            }

            newMember.voiceChannel.overwritePermissions(newMember.id, {
                VIEW_CHANNEL: false
            });

            vcPerks.set(`${newMember.id}`, `${newVC.id}`);
            custvcadmin.set(`${newVC.id}`, `${newMember.id}`);
        });

    }

    
    if (oldMember.voiceChannel) {
        if (!oldMember.voiceChannel.members.first() && oldMember.voiceChannelID != 607592608641974324) {
            oldMember.voiceChannel.delete();

            let vchannel = oldMember.guild.channels.find('id', '607592608641974324');

            vchannel.overwritePermissions(custvcadmin.get(oldMember.voiceChannel.id), {
                VIEW_CHANNEL: true
            });

            vcPerks.delete(`${custvcadmin.get(oldMember.voiceChannel.id)}`);

            if (oldMember.guild.channels.find(`id`, `592207697701634062`).children.map(c => c.type).filter(x => x === 'voice').length == 1) {
                vcPerks.clear();
                custvcadmin.clear();
            }
        }
    }

}

module.exports.vcinfo = {
    vcPerks
}