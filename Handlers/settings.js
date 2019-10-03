const { connect } = require('mongoose');
const { readFileSync } = require('fs');
const setschema = require('../models/settingsSchema.js');
const expschema = require('../models/expSchema.js');

let exparr = [];
let weeklyarr = [];
let expswitch = 0;
const serverid = JSON.parse(readFileSync('./Handlers/serverid.json', 'utf8'))["serverID"]

module.exports = Mizu => {

    Mizu.sets = { antiSpamSettings: {}, logChannels: {}, modBlockedChannels: {} };
    
    setInterval(() => {
        connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });

        setschema.findOne({ serverID: serverid }, (err, res) => {
            if(err) console.log(err);

            if(!res) {
                const newSets = new setschema({
                    serverID: serverid
                });

                console.log('settings created');
                newSets.save().catch(err => console.log(err));
            } else {
                Mizu.sets = res;
            }
        });

        if(expswitch == 0){
            expschema.find({}, {
                "277888888838815744.EXPERIENCE": 1, 
                "UUID": 1,
                'LAST KNOWN USERNAME': 1,
                "277888888838815744.COMBO": 1,
                _id: 0
            }).sort({
                "277888888838815744.EXPERIENCE": -1
            }).then(res => {
                exparr = Array.from(res);
                expswitch = 1;
            });
        } else {
            expschema.find({}, {
                "277888888838815744.WEEKLY EXPERIENCE": 1, 
                "UUID": 1,
                'LAST KNOWN USERNAME': 1,
                _id: 0
            }).sort({
                "277888888838815744.WEEKLY EXPERIENCE": -1
            }).then(res => {
                weeklyarr = Array.from(res);
                expswitch = 0;
            });
        }
        

    }, 10000);

}

module.exports.experience = () => ({ expArray: exparr, weeklyArray: weeklyarr });