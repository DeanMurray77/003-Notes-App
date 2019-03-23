import moment from 'moment';
import { sortNotes, getNotes } from './notes';
import { getFilters } from './filters';


// Generate the DOM structure for a note
function generateNoteDom(note) {
    console.log("inside of generateNoteDom");
    const elNote = document.createElement('a');
    const elTitle = document.createElement('p');
    const elLastEdited = document.createElement('p');
    const elRemovalButton = document.createElement('button');

    elNote.classList.add('actions__container');

    // Create the title element
    elTitle.textContent = note.title;
    elTitle.classList.add('list-item__title');
    elNote.appendChild(elTitle);

    // Setup the link
    elNote.setAttribute('href', '/edit.html#' + note.id);
    elNote.classList.add('list-item');

    // Setup the status message
    elLastEdited.textContent = generateLastEdited(note.updatedAt);
    elLastEdited.classList.add('list-item__subtitle');
    elNote.appendChild(elLastEdited);

    return elNote;
}

// Render application notes
function renderNotes() {
    console.log("Inside of renderNotes");
    const elNotes = document.querySelector('#notes')
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    
    //Remove existing notes
    elNotes.innerHTML = '';

    //Filter Title by search text
    let filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    // if(filteredNotes.length > 0) {
        //Display Filtered Notes
        filteredNotes.forEach((note) => {
            elNotes.appendChild(generateNoteDom(note));        
        });
    // } else {
    //     console.log("No notes to show");
    //     const emptyMessage = document.createElement('p');
    //     emptyMessage.textContent = 'No notes to show';
    //     emptyMessage.classList.add('empty-message');
    //     elNotes.appendChild(emptyMessage);
    // }

}

const initializeEditePage = (noteId) => {
    const elementTitle = document.querySelector('#edit-page-note-title');
    const elementBody = document.querySelector('#edit-page-note-body');
    const elementLastEdited = document.querySelector('#edit-page-last-edited');
    const notes = getNotes();
    
    const note = notes.find(function(note) {
        return note.id === noteId;
    })
    
    if (!note) {
        location.assign('/index.html');
    }

    elementTitle.value = note.title;
    elementBody.value = note.body;
    elementLastEdited.textContent = generateLastEdited(note.updatedAt);
}

//Generate the Last Edited text string
function generateLastEdited(timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDom, renderNotes, generateLastEdited, initializeEditePage };