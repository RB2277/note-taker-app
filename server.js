//All of the required packages used throughout the file
const express = require('express');
const path = require('path');
const savedNotes = require('./db/db.json')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Initializes express and sets the PORT to process.env.PORT OR 3001
const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/index.html'))
 );



//Route to get the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


//Route to load all previous saved notes
app.get('/api/notes', (req, res) => {
  // Read the updated notes from db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const update = JSON.parse(data)
    res.json(update)
  })
});


//Route to load a specific note upon clicking it
app.get('/api/notes/:id', (req, res) => {
  res.json(activeNote)
});


//Route to save a note
//This code is a modified snippet from lesson 19 of module 11
app.post('/api/notes/', (req, res) => {

const {title, text} = req.body

const savedNotes = fs.readFileSync('./db/db.json', 'utf-8')

  const newNote = {
    title,
    text,
    id: uuidv4(),
  }

const notes = JSON.parse(savedNotes)
notes.push(newNote)
const JsonString = JSON.stringify(notes, null, 2)
  fs.writeFileSync('./db/db.json', JsonString)

res.json(notes)

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

 res.json(filteredNotes)
  }

})


//Wildcard route to redirect all unknown requests to the homepage
app.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/index.html'))
 );

//Tells express to listen to the port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
