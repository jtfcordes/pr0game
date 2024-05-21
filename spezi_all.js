// ==UserScript==
// @name         Spezi
// @namespace    http://tampermonkey.net/
// @version      2024-05-18
// @description  try to take over the world!
// @author       You
// @include     /https:\/\/(www.|)pr0game\.com\/(.*\/)?game\.php.*/
// // @require      https://cdn.plot.ly/plotly-latest.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
   

    const idsToZero = [202, 203, 208, 209, 210, 214]

    const idsPrevValues = {}

    function overview() {
        
        let content = document.getElementsByTagName("content")[0]

        content.getElementsByClassName("infos")[0].remove()
        content.getElementsByClassName("infos")[1].remove()
        content.getElementsByClassName("infos")[1].remove()
        
        
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
            const planetNames = text.match(/Planet (\w+) \[(\d+:\d+:\d+)\]/g).map(match => match.replace('Planet ', ''));
            const truemNamesMatch = text.match(/Trümmerfeld \[(\d+:\d+:\d+)\]/g)
            var truemNames = ""
            if(truemNamesMatch != null)             
                truemNames = truemNamesMatch.map(match => match.replace('Trümmerfeld ', ''));
            const matches = text.match(/\(([^)]+)\)/g).map(match => match.slice(1, -1));
            const what = text.match(/Mission: (\w+)/g).map(match => match.replace('Mission: ', ''));
            console.log(planetNames,what, matches, truemNames);


            for(let i = 0 ; i < planetNames.length; i++) {
                var p = planetNames[i].split(' ')
                var name = p[0]
                var coord = p[1]
                var cc = coord.replace('[', '').replace(']', '').split(':')
                planetNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${name} ${coord}</a>`
            }


            for(let i = 0 ; i < truemNames.length; i++) {
                var p = truemNames[i].split(' ')
                var coord = p[0]
                var cc = coord.replace('[', '').replace(']', '').split(':')
                truemNames[i] = `<a href="game.php?page=galaxy&amp;galaxy=${cc[0]}&amp;system=${cc[1]}">${coord}</a>`
            }

            if(matches.length == 2) {
                matches[1] = matches[1].replace('Rohstoffe: ', '')
                matches[1] = matches[1].replace('Metall', 'M')
                matches[1] = matches[1].replace('Kristall', 'K')
                matches[1] = matches[1].replace('Deuterium', 'D')
                matches[1] = matches[1].replace(/;/g, '</br>')
            }
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

            cell = document.createElement("td");
            if(planetNames.length > 1) {
                cell.innerHTML = `${planetNames[0]}</br>${arrow} ${planetNames[1]}`;
            }else{
                if(truemNames.length == 1){
                    cell.innerHTML = `${planetNames[0]}</br>${arrow} Trümmerfeld ${truemNames[0]}`;
                }else{
                    cell.innerHTML = `${planetNames[0]}</br>${arrow}`
                }

            }
            row.appendChild(cell);


            cell = document.createElement("td");
            if(matches.length > 1) {
                cell.innerHTML = `${matches[1]}`;
            }
            row.appendChild(cell);


            

            // cell = document.createElement("td");
            // cell.innerHTML = `${items[i].children.item(3).outerHTML}`;
            // row.appendChild(cell);

            
            

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
            


        var trace1 = {
            type: 'bar',
            x: [1, 2, 3, 4],
            y: [5, 10, 2, 8],
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
          };
          
          var data = [ trace1 ];
          
          var layout = { 
            title: 'Responsive to window\'s size!',
            font: {size: 18}
          };
          
          var config = {responsive: true}
          
        //   Plotly.newPlot(div, data, layout, config );
            
            
        //     if(planetNames.length > 1) {
        //         items[i].children.item(2).innerHTML = `</div style="width=300"><b>${what[0]}</b>: <span style="color: #aaaaaa">${planetNames[0]} ${arrow} ${planetNames[1]}</br>${matches[0]}</span>`
        //         if(matches.length > 1)
        //          items[i].children.item(2).innerHTML = items[i].children.item(2).innerHTML + `</br><span style="color: #aaaaaa">${matches[1]}</span>`
                
        //     }else { 
        //         items[i].children.item(2).innerHTML = `&emsp;&emsp;&emsp;&emsp;&emsp;<b>${what[0]}</b>: ${arrow} ${planetNames[0]}</br><span style="color: #aaaaaa">${matches[0]}</span>` 
        //     }

          
        //     // table.rows[i].cells[2].firstElementChild.rows[0].remove()
        // }
    
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