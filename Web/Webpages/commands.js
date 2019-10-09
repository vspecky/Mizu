const commandDiv = document.getElementById('commands');

const generateTable = (table, data) => {

    const commands = Object.keys(data);

    for(let elem of commands) {

        let row = table.insertRow();

        for(key in data[elem]) {

            console.log(key);

            let cell = row.insertCell();
            let text = document.createTextNode(data[elem][key])//.replace(/(```)?(**)?/g, ''));
            cell.appendChild(text);

        }

    }

}

const generateTableHead = (table, data) => {

    const t_head = table.createTHead();
    const row = t_head.insertRow();

    for(let key in data.addprefix) {

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

    const adminTable = document.getElementById('Administration');

    generateTableHead(adminTable, resTable.Administration);

}

getCommands();

