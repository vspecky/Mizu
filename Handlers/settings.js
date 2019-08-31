const { connect } = require('mongoose');
const setschema = require('../models/settingsSchema.js');
const expschema = require('../models/expSchema.js');
let setObj = {};
let exparr = [];
let weeklyarr = [];
let expswitch = 0;


module.exports = async () => {
    
    setInterval(() => {
        connect('mongodb://localhost/RATHMABOT', {
            useNewUrlParser: true
        });

        setschema.findOne({ serverID: 277888888838815744 }, (err, res) => {
            if(err) console.log(err);

            if(!res) {
                const newSets = new setschema({
                    serverID: 277888888838815744
                });

                console.log('settings created');
                newSets.save().catch(err => console.log(err));
            } else {
                setObj = res;
            }
        });

        if(expswitch == 0){
            expschema.find({}, {
                "277888888838815744.EXPERIENCE": 1, 
                "UUID": 1,
                'LAST KNOWN USERNAME': 1,
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
        

    }, 30000);

}

module.exports.settings = () => {
    return setObj;
}

module.exports.experience = () => {
    return {
        expArray: exparr,
        weeklyArray: weeklyarr 
    }
}