// ==UserScript==
// @name         Spezi
// @namespace    http://tampermonkey.net/
// @version      2024-05-18
// @description  try to take over the world!
// @author       You
// @include        /https:\/\/(www.|)pr0game\.com\/(.*\/)?game\.php.*/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/git/pr0game/spezi_all.js
// ==/UserScript==
// @require      https://raw.githubusercontent.com/jtfcordes/pr0game/main/spezi_all.js


(function () {
    'use strict';
    let raids = ["2:214:6", "2:214:7", "2:193:4"]
    main(raids)
    
    console.log("Spezi Script loaded");
    // var config = localStorage.getItem("CONFIG")
    // if( config == null) {
    //     localStorage.setItem("CONFIG", JSON.stringify({
    //         "fleet": {
    //             "raid": {
    //                 "2:214:6": {
    //                     "min": 0,
    //                     "max": 0,
    //                     "time": 0
    //                 },
    //                 "2:214:7": {
    //                     "min": 0,
    //                     "max": 0,
    //                     "time": 0
    //                 }
    //             }
    //         }
            
    //     }));
    //     config = localStorage.getItem("CONFIG")
    // }

    // console.log("config:",config);

    let hasFleet = document.getElementById("fleetTable");
    if (hasFleet) 
        {
            fleet();
            // replaceCommons(hasFleet.getElementsByTagName("*"))
            
        }

    let hasStats = document.getElementById("statistics");
    if (hasStats) stats();

    let warning_mins = 5.0;
    let hasOverview = document.getElementById("overview");
    if (hasOverview) 
    {
        overview(warning_mins, true);
        // replaceCommons(hasOverview.getElementsByTagName("*"))
    }


    // replaceSkinText(false);
    // replaceCommons()
    
})();
