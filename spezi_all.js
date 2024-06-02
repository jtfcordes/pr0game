// ==UserScript==
// @name         Spezi
// @namespace    http://tampermonkey.net/
// @version      2024-05-18
// @description  try to take over the world!
// @author       You
// @include     /https:\/\/(www.|)pr0game\.com\/(.*\/)?game\.php.*/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==



function convertToSeconds(timeStr) {
    // Use regular expressions to extract the minutes and seconds
    const minutesMatch = timeStr.match(/(\d+)m/);
    const secondsMatch = timeStr.match(/(\d+)s/);
    const hoursMatch = timeStr.match(/(\d+)h/);
    const daysMatch = timeStr.match(/(\d+)d/);

    // Convert the matched strings to integers
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;


    // Calculate the total seconds
    const totalSeconds  = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;

    return totalSeconds;
}

function overview(warning_min=5, sort=true) {
    

    let content = document.getElementsByTagName("content")[0]


    content.getElementsByClassName("infos")[2].remove()
    content.getElementsByClassName("infos")[2].remove()


    console.log(content);
    let list = content.getElementsByTagName("ul")[0];
    list.setAttribute("style", "text-align: left;")
    var items = list.getElementsByTagName("li");

    const listCopy = list.cloneNode(true);
    // let row = table.rows[2]

    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    tbl.setAttribute("style", ".equalDivide tr td { width:25%; };")
    const tblBody = document.createElement("tbody");

    const tbl2 = document.createElement("table");
    tbl2.setAttribute("style", ".equalDivide tr td { width:25%; };")
    const tblBody2 = document.createElement("tbody");


    for (let i = 0; i < items.length; i++) {

        var text = items[i].children.item(2).textContent;
        var c = items[i].children.item(2).getAttribute("class");
        console.log(text);
        const planetNames = text.match(/Planet ([\w\s]+) \[(\d+:\d+:\d+)\]/g).map(match => match.replace('Planet ', ''));

        const positionNamesMatch = text.match(/Position \[(\d+:\d+:\d+)\]/g);
        var positionNames = ""
        if (positionNamesMatch != null)
            positionNames = positionNamesMatch.map(match => match.replace('Position ', ''));

        const truemNamesMatch = text.match(/Trümmerfeld \[(\d+:\d+:\d+)\]/g)
        var truemNames = ""
        if (truemNamesMatch != null)
            truemNames = truemNamesMatch.map(match => match.replace('Trümmerfeld ', ''));

        const matches = text.match(/\(([^)]+)\)/g).map(match => match.slice(1, -1));
        const what = text.match(/Mission: (\w+)/g).map(match => match.replace('Mission: ', ''));
        console.log(planetNames, what, matches, truemNames);


        for (let i = 0; i < planetNames.length; i++) {
            var p = planetNames[i].split(' ')
            var name = (p.slice(0, -1)).join(' ')
            var coord = p[p.length - 1]
            var cc = coord.replace('[', '').replace(']', '').split(':')
            planetNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${name} ${coord}</a>`
        }

        for (let i = 0; i < truemNames.length; i++) {
            var p = truemNames[i].split(' ')
            var coord = p[0]
            var cc = coord.replace('[', '').replace(']', '').split(':')
            truemNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${coord}</a>`
        }

        for (let i = 0; i < positionNames.length; i++) {
            var p = positionNames[i].split(' ')
            var coord = p[0]
            var cc = coord.replace('[', '').replace(']', '').split(':')
            positionNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${coord}</a>`
        }

        if (matches.length == 2) {
            matches[1] = matches[1].replace('Rohstoffe: ', '')
            matches[1] = matches[1].replace('Metall', 'M')
            matches[1] = matches[1].replace('Kristall', 'K')
            matches[1] = matches[1].replace('Deuterium', 'D')
            matches[1] = matches[1].replace(/;/g, '</br>')
            matches[1] = matches[1].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            
        }
        matches[0] = matches[0].replace('Kleiner Transporter', 'kt')
        matches[0] = matches[0].replace('Großer Transporter', 'gt')
        matches[0] = matches[0].replace('Leichter Jäger', 'lj')
        matches[0] = matches[0].replace('Schwerer Jäger', 'sj')
        matches[0] = matches[0].replace('Kreuzer', 'xer')
        matches[0] = matches[0].replace('Schlachtschiff', 'ss')
        matches[0] = matches[0].replace('Bomber', 'bm')
        matches[0] = matches[0].replace('Zerstörer', 'zd')
        matches[0] = matches[0].replace('Todesstern', 'ts')
        matches[0] = matches[0].replace('Recycler', 'rc')
        matches[0] = matches[0].replace('Spionagesonde', 'sp')
        matches[0] = matches[0].replace('Solarsatellit', 'sl')
        matches[0] = matches[0].replace('Kolonieschiff', 'ks')
        matches[0] = matches[0].replace('Schlachtkreuzer', 'sxer')
        matches[0] = matches[0].replace(/;/g, '</br>')
        matches[0] = matches[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

        let arrow = ''
        if (what == 'Angreifen') arrow = '↠'
        if (what == 'Transport') arrow = '⇄'
        if (what == 'Abbauen') arrow = '⇄'
        if (what == 'Stationieren') arrow = '⇴'
        if (what == 'Expedition') arrow = '↯'

        const row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.setAttribute("width", "15%");
        cell.innerHTML = `<span class="${c}">${what}</span>`;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.setAttribute("width", "20%");
        cell.innerHTML = `${matches[0]}`;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.setAttribute("width", "20%");
        if(convertToSeconds(items[i].children.item(1).outerHTML) < warning_min*60){
            cell.innerHTML = `${items[i].children.item(0).outerHTML}</br><span style="color:red;">${items[i].children.item(1).outerHTML}</span>`;
        } else if(convertToSeconds(items[i].children.item(1).outerHTML) < 30*60){
            cell.innerHTML = `${items[i].children.item(0).outerHTML}</br><span style="color:orange;">${items[i].children.item(1).outerHTML}</span>`;
        } else if(convertToSeconds(items[i].children.item(1).outerHTML) > 100*60){
            cell.innerHTML = `${items[i].children.item(0).outerHTML}</br><span style="color:grey;">${items[i].children.item(1).outerHTML}</span>`;
        
        }else{
            cell.innerHTML = `${items[i].children.item(0).outerHTML}</br>${items[i].children.item(1).outerHTML}`;
        }
        row.appendChild(cell);

    
        cell = document.createElement("td");
        cell.setAttribute("width", "25%");

        switch (what[0]) {
            case 'Angreifen':
            case 'Transport':
            case 'Stationieren':
                cell.innerHTML = `von: ${planetNames[0]}</br>nach: ${planetNames[1]}`;
                break;
            case 'Abbauen':
                cell.innerHTML = `von: ${planetNames[0]}</br>nach: Trümmerfeld ${truemNames[0]}`;
                break;
            case 'Expedition':
                cell.innerHTML = `von: ${planetNames[0]}</br>nach: Position ${positionNames[0]}`;
                break;
        }
        row.appendChild(cell);


        cell = document.createElement("td");
        cell.setAttribute("width", "20%");
        if (matches.length > 1) {
            cell.innerHTML = `${matches[1]}`;
        }
        row.appendChild(cell);

        if(sort){
            if (text.includes("zurück")) {
                tblBody2.appendChild(row);
            } else {
                tblBody.appendChild(row);
            }
        }else{
            tblBody.appendChild(row);
        }
    }
    tbl.appendChild(tblBody);
    tbl2.appendChild(tblBody2);

    if(sort) {
        let h = document.createElement("p")
        h.textContent = "Hinweg: ";
        list.parentElement.appendChild(h);
    }
    list.parentElement.appendChild(tbl);
    if(sort) {
        let h = document.createElement("p")
        h.textContent = "Rückweg: ";
        list.parentElement.appendChild(h);
    }
    list.parentElement.appendChild(tbl2);

    list.parentElement.appendChild(listCopy);
    list.remove()
}

function stats() {
    let content = document.getElementsByTagName("content")[0]
    console.log(content);
    let table = content.getElementsByTagName("table")[1]
    // let row = table.rows[2]
    console.log(table.rows.length);

    for (let i = 1; i < table.rows.length; i++) {
        let text = table.rows[i].cells[0].firstElementChild.textContent;
        let textTooltip = table.rows[i].cells[0].firstElementChild.getAttribute('data-tooltip-content');
        table.rows[i].cells[0].firstElementChild.remove();
        table.rows[i].cells[0].innerHTML = text + " (" + textTooltip + ")";
        // table.rows[i].cells[2].firstElementChild.rows[0].remove()
    }

}


function fleet() {
    let content = document.getElementsByTagName("content")[0]
    let table = content.getElementsByTagName("table")[0]
    let table1 = content.getElementsByTagName("table")[1]
    // let row = table.rows[2]
    for (let i = 2; i < table1.rows.length-3; i++) {
        let child = table1.rows[i].cells[0].firstElementChild;
        if(!child)continue;
        let text = document.createElement("div")
        text.innerHTML = child.getAttribute('data-tooltip-content');
    
        table1.rows[i].cells[0].innerHTML = table1.rows[i].cells[0].innerHTML+" ("+text.textContent.replace("Geschwindigkeit: ","")/10000+")";
    }
    for (let i = 2; i < table.rows.length; i++) {
        
        text = table.rows[i].cells[2].firstElementChild.getAttribute('data-tooltip-content');
        table.rows[i].cells[2].firstElementChild.remove();
        table.rows[i].cells[2].innerHTML = text;
        table.rows[i].cells[2].firstElementChild.rows[0].remove();
    }

}

function main(raids) {
    if(raids == undefined) {
        raids = []
    }

    let menu = document.getElementsByTagName("menu")[0]
    let list = menu.getElementsByTagName("ul")[0]
    let pos = list.getElementsByClassName("menu-separator")[1]
    
    for(let i = 0; i < raids.length; i++) {
        let li = document.createElement("li")
        let d = raids[i].split(":");
        li.innerHTML = `<a href="game.php?page=fleetTable&galaxy=${d[0]}&system=${d[1]}&planet=${d[2]}&planettype=1&target_mission=1">Attack [${raids[i]}]</a>`       
        pos.insertAdjacentElement('afterend', li);
        pos = li
    }
    li = document.createElement("li")
    li.setAttribute("class", "menu-separator")
    pos.insertAdjacentElement('afterend', li);

}

function replaceSkinText(raids) {
    if(!raids) return;

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.textContent;
            
            // general
            text = text.replace(/Imperator/g, 'Kapt`n')
            text = text.replace(/Energie/g, 'Nahrung')
            text = text.replace(/Kristall/g, 'Gold')
            text = text.replace(/Metallmine/g, 'Holzfäller')
            text = text.replace(/Metall/g, 'Holz')
            text = text.replace(/Deuteriumsynthetisierer/g, 'Destille')
            text = text.replace(/Deuterium/g, 'Rum')
            text = text.replace(/Battle Hall/g, 'Bordell')

            // gebäude
            text = text.replace(/Fusionskraftwerk/g, 'Fleischerei')
            text = text.replace(/Roboterfabrik/g, 'Hafen')
            text = text.replace(/Nanitenfabrik/g, 'Sklavenmarkt')
            text = text.replace(/Solarkraftwerk/g, 'Windmühle')
            text = text.replace(/TechnoDome/g, 'Bibliothek')
            text = text.replace(/Raumschiffwerft/g, 'Schiffwerft')
            text = text.replace(/Raketensilo/g, 'Waffenschmiede')
            text = text.replace(/Terraformer/g, 'Hafenanlage')          
            
            // flotte
            text = text.replace(/Stationieren/g, 'Überfahrt')

            // schiffe
            text = text.replace(/Solarsatellit/g, 'Schmugglerboot')
            text = text.replace(/Recycler/g, 'Entermannschaft')
            text = text.replace(/Todesstern/g, 'Schwimmende Festung')
            text = text.replace(/Spionagesonde/g, 'Spione')
            
            // Galaxy
            text = text.replace(/Planet/g, 'Hafen')
            text = text.replace(/Galaxie/g, 'Weltmeer')
            text = text.replace(/Galaxy/g, 'Weltmeer')
            text = text.replace(/Mond/g, 'Eiland')

            // Forschung
            text = text.replace(/Computertechnik/g, 'Drucktechnik')
            text = text.replace(/Schildtechnik/g, 'Schifftechnik')
            text = text.replace(/Raumschiffpanzerung/g, 'Schiffpanzerung')
            text = text.replace(/Nahrungtechnik/g, 'Kochkunst')
            text = text.replace(/Hyperraumtechnik/g, 'Takelage')
            text = text.replace(/Hyperraumantrieb/g, 'Segeln')
            text = text.replace(/Impulstriebwerk/g, 'Navigation')
            text = text.replace(/Verbrennungstriebwerk/g, 'Kartographie')
            text = text.replace(/Lasertechnik/g, 'Zauberei')
            text = text.replace(/Ionentechnik/g, 'Alchemie')
            text = text.replace(/Plasmatechnik/g, 'Pyrotechnik')
            text = text.replace(/Intergalaktisches Forschungsnetzwerk/g, 'Kapitänsbuch')
            text = text.replace(/Astrophysik/g, 'Astronomie')
            text = text.replace(/Gravitonforschung/g, 'Verdrängungforschung')


            
            text = text.replace(/Raumschiffwracks/g, 'Schiffwracks')
            

            

            
            
            
             
            

            
            

             
            node.textContent = text;
        }
    }
}
}


