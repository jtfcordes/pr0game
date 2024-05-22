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

(function () {
    'use strict';

    function overview() {
        
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
        const tblBody = document.createElement("tbody");

        const tbl2 = document.createElement("table");
        const tblBody2 = document.createElement("tbody");
        

        for(let i = 0; i < items.length; i++) {
            
            var text = items[i].children.item(2).textContent;
            var c = items[i].children.item(2).getAttribute("class");
            console.log(text);
            const planetNames = text.match(/Planet ([\w\s]+) \[(\d+:\d+:\d+)\]/g).map(match => match.replace('Planet ', ''));
            
            const positionNamesMatch = text.match(/Position \[(\d+:\d+:\d+)\]/g);
            var positionNames = ""
            if(positionNamesMatch != null)
                positionNames = positionNamesMatch.map(match => match.replace('Position ', ''));

            const truemNamesMatch = text.match(/Trümmerfeld \[(\d+:\d+:\d+)\]/g)
            var truemNames = ""
            if(truemNamesMatch != null)             
                truemNames = truemNamesMatch.map(match => match.replace('Trümmerfeld ', ''));
            
                const matches = text.match(/\(([^)]+)\)/g).map(match => match.slice(1, -1));
            const what = text.match(/Mission: (\w+)/g).map(match => match.replace('Mission: ', ''));
            console.log(planetNames,what, matches, truemNames);


            for(let i = 0 ; i < planetNames.length; i++) {
                var p = planetNames[i].split(' ')
                var name = (p.slice(0, -1)).join(' ')
                var coord = p[p.length - 1]
                var cc = coord.replace('[', '').replace(']', '').split(':')
                planetNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${name} ${coord}</a>`
            }

            for(let i = 0 ; i < truemNames.length; i++) {
                var p = truemNames[i].split(' ')
                var coord = p[0]
                var cc = coord.replace('[', '').replace(']', '').split(':')
                truemNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${coord}</a>`
            }

            for(let i = 0 ; i < positionNames.length; i++) {
                var p = positionNames[i].split(' ')
                var coord = p[0]
                var cc = coord.replace('[', '').replace(']', '').split(':')
                positionNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${coord}</a>`
            }

            if(matches.length == 2) {
                matches[1] = matches[1].replace('Rohstoffe: ', '')
                matches[1] = matches[1].replace('Metall', 'M')
                matches[1] = matches[1].replace('Kristall', 'K')
                matches[1] = matches[1].replace('Deuterium', 'D')
                matches[1] = matches[1].replace(/;/g, '</br>')
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


            

            let arrow = ''
            if(what == 'Angreifen') arrow = '↠'
            if(what == 'Transport') arrow = '⇄'
            if(what == 'Abbauen') arrow = '⇄'
            if(what == 'Stationieren') arrow = '⇴'
            if(what == 'Expedition') arrow = '↯'

            const row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.innerHTML = `<span class="${c}">${what}</span>`;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = `${matches[0]}`;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = `${items[i].children.item(0).outerHTML}`;
            row.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = `${items[i].children.item(1).outerHTML}`;
            row.appendChild(cell);
            const returns = text.includes("zurück")
            cell = document.createElement("td");
            
            
            switch(what[0]) {
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
            if(matches.length > 1) {
                cell.innerHTML = `${matches[1]}`;
            }
            row.appendChild(cell);


            if(text.includes("zurück")) {
                tbl2.appendChild(row);
            }else{
            tblBody.appendChild(row);
            }
        }
    
        // add the row to the end of the table body
        tbl.appendChild(tblBody);
        tbl2.appendChild(tblBody2);
        // appends <table> into <body>
        // sets the border attribute of tbl to '2'
        // tbl.setAttribute("border", "2");
        let div = document.createElement("div")
        list.parentElement.appendChild(tbl);
        list.parentElement.appendChild(div);
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
        // let row = table.rows[2]
    
        for (let i = 2; i < table.rows.length; i++) {
            let text = table.rows[i].cells[2].firstElementChild.getAttribute('data-tooltip-content');
            table.rows[i].cells[2].firstElementChild.remove();
            table.rows[i].cells[2].innerHTML = text;
            table.rows[i].cells[2].firstElementChild.rows[0].remove();
        }
    
    }

    function main() {

        let hasFleet = document.getElementById("fleetTable");
        if (hasFleet) fleet();

        let hasStats = document.getElementById("statistics");
        if (hasStats) stats();
        
        let hasOverview = document.getElementById("overview");
        if (hasOverview) overview();
        
        

    }



    main()
})();