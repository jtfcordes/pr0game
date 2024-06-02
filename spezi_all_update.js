// ==UserScript==
// @name         Spezi
// @namespace    http://tampermonkey.net/
// @version      2024-05-18
// @description  try to take over the world!
// @author       You
// @include        /https:\/\/(www.|)pr0game\.com\/(.*\/)?game\.php.*/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://raw.githubusercontent.com/jtfcordes/pr0game/main/spezi_all.js
// ==/UserScript==
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/git/pr0game/spezi_all.js


(function () {
    'use strict';
    let raids = ["2:210:8", "2:210:9"]
    main(raids)


    let hasFleet = document.getElementById("fleetTable");
    if (hasFleet) fleet();

    let hasStats = document.getElementById("statistics");
    if (hasStats) stats();

    let warning_mins = 5.0;
    let hasOverview = document.getElementById("overview");
    if (hasOverview) overview(warning_mins, true);


    replaceSkinText(true);
    
})();
