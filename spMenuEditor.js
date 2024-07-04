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



menu_add(pos, dict) {
    for (const [name, link] of Object.entries(dict)) {
        this.insert_item(pos, name, link)
        pos++
    }
}

};