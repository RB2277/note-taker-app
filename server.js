//All of the required packages used throughout the file
const express = require('express');
const path = require('path');
const savedNotes = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Initializes express and sets the PORT to 3001
const app = express();
const PORT = 3001;

//Express middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


//Route to save a note
//This code is a modified snippet from lesson 19 of module 11
app.post('/api/notes/', (req, res) => {

const {title, text} = req.body

const savedNotes = fs.readFileSync('./db/db.json', 'utf-8')

if(title && text) {
  const newNote = {
    title,
    text,
    id: uuidv4(),
  }

  console.log(newNote)

const notes = JSON.parse(savedNotes)
notes.push(newNote)
const JsonString = JSON.stringify(notes, null, 2)
  fs.writeFileSync('./db/db.json', JsonString)

  res.json({ message: 'Your note has been saved!', notes })
}
});


//Route to delete a note
app.delete('/api/notes/:id', (req, res) => {
  deleteId = req.params.id
  const savedNotes = fs.readFileSync('./db/db.json', 'utf-8')
  const notes = JSON.parse(savedNotes)

  const filteredNotes = notes.filter(note => note.id != deleteId)

  if(filteredNotes.length < notes.length){
    const JsonString = JSON.stringify(filteredNotes, null, 2)
 fs.writeFileSync('./db/db.json', JsonString)

 res.json({status: "Note deleted", notes})
  }

})




app.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/index.html'))
 );



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
