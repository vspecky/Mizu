const commandTable = require('../../Handlers/commands').commands;
const path = require('path')

const commandsTableEndpoint = (req, res, next, bot) => {
    const commandArray = commandTable();

    res.send({ commandTable: commandArray });
}

const commandsPage = (req, res, next, client) => {

    res.sendFile(path.join(__dirname, '../Webpages', 'commands.html'));

}

module.exports = {

    commandsTableEndpoint,
    commandsPage

}