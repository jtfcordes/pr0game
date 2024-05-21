// ==UserScript==
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/fleet.js
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
    


    function main() {

        let hasStats = document.getElementById("statistics");
        if (hasStats) stats();

    }



    main()
})();