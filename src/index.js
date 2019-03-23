import { createNote } from './notes';
import { setFilters } from './filters';
import { renderNotes } from './views';

let elementSortBy = document.querySelector('#sort-by')
// elementSortBy.value = filters.sortBy;

renderNotes();

document.querySelector("#create-note-button").addEventListener('click', function(event) {
    console.log("pushed create note button. Inside of listener..");
    let noteID = createNote();
    //location.assign("/edit.html#" + noteID);
})

document.querySelector('#filter-notes').addEventListener('input', function(event) {
    setFilters({
        searchText: event.target.value
    });
    renderNotes();
})

elementSortBy.addEventListener('change', function(event) {
    setFilters({
        sortBy: event.target.value
    });
    renderNotes();
})

window.addEventListener('storage', function(event) {
    if(event.key === 'notes') {
        renderNotes();
    }
})


