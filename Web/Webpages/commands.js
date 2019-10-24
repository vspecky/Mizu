const commandDiv = document.getElementById('commands');
const options = ['name', 'usage', 'desc', 'note'];

const generateTable = (table, data) => {

    const commands = Object.keys(data);

    for(let elem of commands) {

        const row = table.insertRow();

        for(let key of options) {

            if(data[elem][key]) {
                const cell = row.insertCell();
                const text = document.createTextNode(data[elem][key].replace(/\**/g, ''));
                cell.appendChild(text);

            }

        }

    }

}

const generateTableHead = (table, data) => {

    const t_head = table.createTHead();
    const row = t_head.insertRow();

    for(let key of options) {

        const th = document.createElement('th');
        const text = document.createTextNode(key);

        th.appendChild(text);
        row.appendChild(th);

    }

    generateTable(table, data);

}

const getCommands = async () => {

    let resTable = await fetch('http://localhost:3000/views/tables/commands9913').then(res => res.json());

    resTable = resTable.commandTable[0];

    const adminTable = document.querySelector('#admintable');
    const cvTable = document.querySelector('#custvctable');
    const sfwTable = document.querySelector('#funsfwtable');
    const nsfwTable = document.querySelector('#nsfwtable');
    const utilTable = document.querySelector('#utiltable');
    const expTable = document.querySelector('#exptable')

    generateTableHead(adminTable, resTable.Administration);
    generateTableHead(cvTable, resTable.CustomVoice);
    generateTableHead(sfwTable, resTable.FunSFW);
    generateTableHead(nsfwTable, resTable.NSFW);
    generateTableHead(utilTable, resTable.Utility);
    generateTableHead(expTable, resTable.Experience);

}

getCommands();

