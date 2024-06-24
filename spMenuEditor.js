// Description: This script is used to edit the menu of the game.
// Version: 2024-05-18

class MenuEditor {

    constructor(menu, list_tag, list_id) {
        this.menu = menu
        this.list_tag = list_tag
        this.list_id = list_id
    }


/**
 * Lists the main menu items and their attributes.
 * 
 * @param {HTMLElement} menu - The menu element to list the items from.
 */
static print_lists(menu, list_tag){
    
    let lists = menu.getElementsByTagName(list_tag)
    for (let i = 0; i < lists.length; i++) {
        var list = lists[i]
        let items = list.getElementsByTagName("li")
        console.log(`List ${i}: ` + items.length)
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent == "") {
                console.log(`${i}: ` + items[i].getAttribute('class'))
            }else{
                console.log(`${i}: ` + items[i].textContent)
            }
            console.log()
            
        }
    }
}


insert_separator(item_id) {
    const lists = this.menu.getElementsByTagName(this.list_tag)
    const items = lists[this.list_id].getElementsByTagName("li")
    const item_pos = items[item_id]
    let li = document.createElement("li")
    li.setAttribute("class", "menu-separator")
    item_pos.insertAdjacentElement('afterend', li)
}

insert_item(item_id, name, link) {
    let lists = this.menu.getElementsByTagName(this.list_tag)
    let items = lists[this.list_id].getElementsByTagName("li")
    const item_pos = items[item_id]
    let li = document.createElement("li")
    let a = document.createElement("a")
    a.href = link
    a.textContent = name
    li.appendChild(a)
    item_pos.insertAdjacentElement('afterend', li)
}


edit_item(item_id, name, link) {
    let lists = this.menu.getElementsByTagName(this.list_tag)
    let items = lists[this.list_id].getElementsByTagName("li")
    const item_pos = items[item_id]
    let a = item_pos.getElementsByTagName("a")[0]
    a.href = link
    a.textContent = name
    // li.appendChild(a)
    // item_pos.insertAdjacentElement('afterend', li)
}


menu_add(raids) {
    if (raids == undefined) {
        raids = []
    }
    // Menu Element
    let menu = document.getElementsByTagName("menu")[0]
    let list = menu.getElementsByTagName("ul")[0]
    
    // Add Raids Quicklinks
    let pos = list.getElementsByClassName("menu-separator")[1]
    for (let i = 0; i < raids.length; i++) {
        let li = document.createElement("li")
        let d = raids[i].split(":");
        li.innerHTML = `<a href="game.php?page=fleetTable&galaxy=${d[0]}&system=${d[1]}&planet=${d[2]}&planettype=1&target_mission=1">A:[${raids[i]}]</a>`
        pos.insertAdjacentElement('afterend', li);
        pos = li
    }

    // Add All Messages
    li = document.createElement("li")
    li.setAttribute("class", "menu-separator")
    pos.insertAdjacentElement('afterend', li);

    li = document.createElement("li")
    li.innerHTML = `<a href="game.php?page=messages&category=100">Alle Nachrichten</a>`
    list.getElementsByTagName("li")[10].insertAdjacentElement('afterend', li);
    

}

};