var tableNames = [
    'Table 0: Fleet Data',
    'Table 1: Fleet Control',
    'Table 2: Transport Information',
    'Table 3: Tech. Information',
    'Table 4: User Defined',
];


// Function to list all tables in the document
function listTables(tables) {
    for (let i = 0; i < tables.length; i++) {
        console.log(tableNames[i]);
    }
}

// Function to generate table names based on content
function generateTableNames() {
    const tables = document.getElementsByTagName('table');
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const content = table.textContent.trim();
        const tableName = `Table ${i + 1}: ${content}`;
        console.log(tableName);
    }
}

// Function to add a new column to a table
function addColumn(tableId, headerTitle) {
    const table = document.getElementById(tableId);
    if (table) {
        const headerRow = table.querySelector('tr');
        const newHeaderCell = document.createElement('th');
        newHeaderCell.textContent = headerTitle;
        headerRow.appendChild(newHeaderCell);

        const rows = table.querySelectorAll('tr');
        for (let i = 1; i < rows.length; i++) {
            const newRowCell = document.createElement('td');
            rows[i].appendChild(newRowCell);
        }
    }
}
