module.exports = async (bot) => {

    console.log(`${bot.user.username} is online.`);

    const playArr = ['with Spec', 'being tested', 'being awesome', 'with life']

    let index = 0;

    setInterval(() => {
        bot.user.setActivity(`${playArr[index]}`, { type: "Playing" });
        index++;
        if(index >= 4) index = 0;
    }, 30000);
    
    

}