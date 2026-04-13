fetch('matrix.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').filter(row => row.trim() !== "");
        let table = '<table><thead><tr>';
        
        // Headers
        rows[0].split(',').forEach(h => table += `<th>${h}</th>`);
        table += '</tr></thead><tbody>';

        // Rows
        for (let i = 1; i < rows.length; i++) {
            table += '<tr>';
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            cols.forEach((col, index) => {
                const cleanText = col.replace(/^"|"$/g, '').trim();
                const className = index === 0 ? 'class="id-cell"' : '';
                table += `<td ${className}>${cleanText}</td>`;
            });
            table += '</tr>';
        }
        
        table += '</tbody></table>';
        document.getElementById('matrix-container').innerHTML = table;
    })
    .catch(err => {
        console.error("Error loading CSV:", err);
        document.getElementById('matrix-container').innerHTML = "Error loading requirements.";
    });
