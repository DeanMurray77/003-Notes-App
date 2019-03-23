import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

// Read existing notes from local storage
function loadNotes() {
    console.log('Inside loadNotes');
    let notesJSON = localStorage.getItem('notes');
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        console.log("Error in load notes");
        return [];
    }

}

// Expose notes from module
const getNotes = () => notes;

// Create a new note and push it onto the notes array
const createNote = () => {
    console.log("inside of create note function");
    const timestamp = moment().valueOf();
    
    const id = uuidv4();

    console.log("inside of create note. UIID = " + id);

    notes.push({
        id: id,
        title: 'Temp Title',
        body: 'Temp Body',
        createdAt: timestamp,
        updatedAt: timestamp
    })

    console.log("Length of notes: " + notes.length);
    saveNotes();

    return id;
}

// Save the notes array off to local storage
function saveNotes() {
    let notesJSON = JSON.stringify(notes);
    localStorage.setItem('notes', notesJSON);
}

// Remove a single note based off of the note's ID.
function removeNote(id) {
    let index = notes.findIndex(function(note) {
        return id === note.id;
    });

    if(index > -1) {
        notes.splice(index, 1);
        saveNotes();
    }
}

// Sorts the notes. By date created, date edited, or alphabetical.
function sortNotes(orderBy) {
    if(orderBy === 'byCreated') {
        notes = notes.sort((a,b) => {
            if(a.createdAt < b.createdAt) {
                return 1; //smallest is oldest, but we want newest at the top
            }
            else if(a.createdAt > b.createdAt) {
                return -1;
            } else {
                return 0;
            }
        })
    } else if(orderBy === 'byEdited') {
        notes = notes.sort((a,b) => {
            if(a.updatedAt < b.updatedAt) {
                return 1; //smallest is oldest, but we want newest at the top
            } else if(a.updatedAt > b.updatedAt) {
                return -1;
            } else {
                return 0;
            }
        })
    } else {
        notes = notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1; 
            } else if(a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    return notes;
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => {
        return note.id === id;
    })

    if(!note) {
        return;
    }

    if(typeof updates.title === 'string') {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    }

    if(typeof updates.body === 'string') {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    }

    saveNotes();
    return note;
}

notes = loadNotes();

// Export functions for use in other modules
export { getNotes, createNote, removeNote, sortNotes, updateNote };