const commandTable = require('../../Handlers/commands').commands;
const path = require('path');

const commandsTableEndpoint = (req, res) => {
    const commandArray = commandTable();

    res.send({ commandTable: commandArray });
}

const commandsPage = (req, res) => {

    res.sendFile(path.join(__dirname, '../Webpages', 'commands.html'));

}

module.exports = {

    commandsTableEndpoint,
    commandsPage

}