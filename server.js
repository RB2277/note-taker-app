const express = require('express');
const path = require('path');
const savedNotes = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

//Route to get the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);






//Route to load all previous saved notes
app.get('/api/notes', (req, res) => res.json(savedNotes));




//Route to load a specific note upon clicking it
app.get('/api/notes/:id', (req, res) => {
  res.json(activeNote)
});






// app.post('/api/notes/:id', (req, res) => {

//   });


app.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/index.html'))
 );




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


/*
Acceptance Critera

GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
WHEN I click on the Save button
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
WHEN I click on the "New Note" button in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears

*/