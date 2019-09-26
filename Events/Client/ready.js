const mongoose = require('mongoose');
const expschema = require('../../models/expSchema.js');

module.exports = async (bot) => {

    console.log(`${bot.user.username} has booted up.`);

    const playArr = ['with Spec', 'being tested', 'being awesome', 'with life']

    let index = 0;

    setInterval(() => {
        index++;
        if (index >= 4) index = 0;
        bot.user.setActivity(`${playArr[index]}`, { type: "Playing" });
    }, 60000);

}