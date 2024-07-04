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
    
    // Popup for messages
    const message_elements = document.getElementsByClassName('message');
    console.log(message_elements);
    if (message_elements.length > 0) {
        let a = message_elements[0].getElementsByTagName('a')[0];
        a.href = "?page=messages&category=100";
    }

    const tables = document.getElementsByTagName('table');
    listTables(tables);
    
    const menu = document.getElementsByTagName("menu")[0]
    MenuEditor.print_lists(menu, "ul")
    const list_id = 0

    
    let menu_editor = new MenuEditor(menu, "ul", list_id)
    const item_id_nachrichten = 10
    menu_editor.edit_item(item_id_nachrichten, "Nachrichten", `game.php?page=messages&category=100`)
    
    
    const raids = ["2:214:6", "2:214:7", "2:214:12", "2:198:12", "2:196:10", "2:196:11", "2:196:12"];
    const raidDictionary = raids.reduce((dict, raid) => {
        const [galaxy, system, planet] = raid.split(":");
        const key = `A:[${raid}]`;
        const link = `game.php?page=fleetTable&galaxy=${galaxy}&system=${system}&planet=${planet}& planettype=1&target_mission=1`;
        dict[key] = link;
        return dict;
    }, {});


    const item_id_separator_1 = 23
    menu_editor.menu_add(item_id_separator_1, raidDictionary)
    menu_editor.insert_separator(item_id_separator_1+raids.length)
    
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
