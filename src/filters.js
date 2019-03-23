const filters = loadSavedFilters();

const getFilters = () => filters;

const setFilters = (update) => {
    if(typeof update.searchText === 'string') {
        filters.searchText = update.searchText;
    }

    if(typeof update.sortBy === 'string') {
        filters.sortBy = update.sortBy;
    }
    saveFilters();
}

function loadSavedFilters() {
    let filtersJSON = localStorage.getItem('notesFilter');

    if(filtersJSON) {
        return JSON.parse(filtersJSON);
    } else {
        return {
            searchText: '',
            sortBy: 'byEdited'
        };
    }
}

function saveFilters() {
    let filtersJSON = JSON.stringify(filters);
    localStorage.setItem('notesFilter', filtersJSON);
}

export { getFilters, setFilters };