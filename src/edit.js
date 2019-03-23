import { updateNote, removeNote } from "./notes";
import { initializeEditePage, generateLastEdited } from './views';

const elementTitle = document.querySelector('#edit-page-note-title');
const elementBody = document.querySelector('#edit-page-note-body');
const elementRemoveButton = document.querySelector('#edit-page-remove-note-button');
const elementLastEdited = document.querySelector('#edit-page-last-edited');
const noteId = location.hash.substring(1);

initializeEditePage(noteId);

elementTitle.addEventListener('input', function(event) {
    const note = updateNote(noteId, {
        title: event.target.value
    });

    elementLastEdited.textContent = generateLastEdited(note.updatedAt);
})

elementBody.addEventListener('input', function(event) {
    const note = updateNote(noteId, {
        body: event.target.value
    });
    
    elementLastEdited.textContent = generateLastEdited(note.updatedAt);
})

elementRemoveButton.addEventListener('click', function(event) {
    removeNote(noteId);
    location.assign('/index.html');
})

window.addEventListener('storage', function(e) {
    if(e.key === 'notes') {  // <- Confirm that it was our 'notes' data that changed
        initializeEditePage(noteId);
    }
})