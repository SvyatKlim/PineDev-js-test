async function getJSONData() {
    let parsedData = undefined;
    try {
        let response = await fetch('./test-table.json');
        parsedData = await response.json();
        return parsedData;
    } catch(err) {
        throw new Error('Sorry, no results');
    }
}

function renderData(data, col = '.col', row = 'col__row') {
    let rows = document.querySelectorAll('.' + row);
    rows.forEach((row) => {
        row.remove();
    })

    if(data) {
        data.forEach((obj) => {
            if (Object.keys(obj).length) {
                for (let property in obj) {
                        let currentCol = document.querySelector(`${col}[data-name=${property}]`);
                        let newRow = document.createElement('div');
                        newRow.classList.add(row);
                        newRow.innerText = obj[property];
                        currentCol.appendChild(newRow);
                }
            }
        })
    }
}

function filterData(data, impClass = '.search-field'){
    let searchObj = {};
    let searchInputs = document.querySelectorAll(impClass);
    searchInputs.forEach((inp) => {
        let attr = inp.getAttribute('name');
        searchObj[attr] = inp.value.toLowerCase().trim();
    });

     let newData = data.filter(obj =>
        Object.keys(searchObj).every(key => {
            let formatted = obj[key].toLowerCase();
            return formatted.includes(searchObj[key])
    }));

    renderData(newData);
}

function init(){
    getJSONData().then((data) => {
        renderData(data);

        let searchInputs = document.querySelectorAll('.search-field');
        searchInputs.forEach((inp) => {
            inp.addEventListener('input', () => {
                filterData(data);
            });
        })
    })

}

init();


