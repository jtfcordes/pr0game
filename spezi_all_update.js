// ==UserScript==
// @name         Spezi
// @namespace    http://tampermonkey.net/
// @version      2024-05-18
// @description  try to take over the world!
// @author       You
// @include        /https:\/\/(www.|)pr0game\.com\/(.*\/)?game\.php.*/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/git/pr0game/spMenuEditor.js
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/git/pr0game/spTableEditor.js
// @require      file:///home/jtfc/Documents/Projekte/pr0Game/Scripts/git/pr0game/spezi_all.js
// ==/UserScript==



(function () {
    'use strict';
    
    const context = window.location.href.split("?").pop();
    console.log(context);
    
    const tables = document.getElementsByTagName('table');
    listTables(tables);
    
    const menu = document.getElementsByTagName("menu")[0]
    MenuEditor.print_lists(menu, "ul")
    const list_id = 0

    
    let menu_editor = new MenuEditor(menu, "ul", list_id)
    const item_id_nachrichten = 10
    menu_editor.edit_item(item_id_nachrichten, "Nachrichten", `game.php?page=messages&category=100`)
    
    
    const raids = ["2:214:6", "2:214:7", "2:211:5"]
    const item_id_separator_1 = 23
    for (let i = 0; i < raids.length; i++) {

        const d = raids[i].split(":");
        const link = `game.php?page=fleetTable&galaxy=${d[0]}&system=${d[1]}&planet=${d[2]}&planettype=1&target_mission=1`
        const name = `A:[${raids[i]}]`
        menu_editor.insert_item(item_id_separator_1, name, link)
    }
    menu_editor.insert_separator(item_id_separator_1+raids.length)




    // edit_menu(raids)

    // generateTableNames()
    
    let hasFleet = document.getElementById("fleetTable");
    if (hasFleet) fleet();
        

    let selector = document.getElementById("planetSelector");
    for (let i = 0; i < selector.options.length; i++) {
        if(selector.options[i].selected == "selected") {
            console.log(selector.options[i].innerHTML);
            break;
        }
        let option = selector.options[i];
        if (option.value == "2:214:6") {
            option.selected = true;
            break;
        }
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
