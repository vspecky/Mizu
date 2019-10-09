const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routers = require('./Routers/router');
const cors = require('cors');
const path = require('path');

module.exports = async bot => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'Webpages')));
    app.use(cors());

    await app.get('/', (req, res) => res.send('Hello'));
    await app.get('/views/tables/commands9913', (req, res) => routers.commandsTableEndpoint(req, res, null, bot));
    await app.get('/commands', (req, res) => routers.commandsPage(req, res, null, bot));

    app.listen(3000);

}