const db = require("./db.json")
const fs = require("fs")
const util = require("util")


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let id = 1

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
                parsedNotes = parsedNotes.concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }   
            return parsedNotes;


        })
     }
     addNote(note){
        let { title, text } = note;
        if(!title || !text){
            throw new Error("can not be blank")
        }
        let newnote = { title, text, id: id++ }
        return this.getNote()
        .then((notes) => [...notes, newnote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newnote)
    }
    removeNote(id){
        return this.getNote()
        .then(notes => notes.filter( note => {
            
            return note.id !== id
        }))
        
        .then((filteredNotes) => {
            return this.write(filteredNotes)
        })
    }
    
}
module.exports  = new Store()