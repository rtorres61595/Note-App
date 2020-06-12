const router = require("express").Router();
const store = require("../db/store.js")



//router.get returns all notes

//routher.post addNote(req.body)

//routher.delete (:id) = req.params.id

//don't forget to export

router.get("/notes", function(req, res){
    store.getNote().then(notes => res.json(notes)) 
});

router.post("/notes", function(req, res){
    store.addNote(req.body).then(notes => res.json(notes)) 
    
});
router.delete ("/notes/:id", function(req, res){

    console.log('id')
    store.removeNote(parseInt(req.params.id)).then( ()=> res.json({ok: true}) 
)})


module.exports = router;