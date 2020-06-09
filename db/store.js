const db = require("./db.json")
const fs = require("fs")
const util = require("util")


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const id = 1

class Store{
    read(){
        return readFileAsync("db/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNote(){
        return this.read().then((notes) => {
            let parsedNotes = [];
            try {
                parsedNotes.concat(JSON.parse(notes));
                console.log(parsedNotes)
            } catch (err) {
                parsedNotes = [];
            }   
            return parsedNotes;


        })
     }
     addNote(note){
        const { title, text } = note;
        if(!title || !text){
            throw new Error("can not be blank")
        }
        const newnote = { title, text, id: id++ }
        return this.getNote()
        .then((notes) => [...notes, newnote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newnote)
    }
    removeNote(id){
        return this.getNote()
        .then((notes)=> notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes))
    }
}
module.exports  = new Store()