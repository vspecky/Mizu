module.exports = async (bot) => {

    console.log(`${bot.user.username} is online.`);

    const playArr = ['with Spec', 'being tested', 'being awesome', 'with life']

    let index = 0;

    setInterval(() => {
        index++;
        if (index >= 4) index = 0;
        bot.user.setActivity(`${playArr[index]}`, { type: "Playing" });
    }, 60000);



}