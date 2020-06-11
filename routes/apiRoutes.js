const router = require("express").Router();
const store = require("../db/store.js")



//router.get returns all notes

//routher.post addNote(req.body)

//routher.delete (:id) = req.params.id

//don't forget to export

router.get("/notes", function(req, res){
    store.getNote();
});

router.post("/notes", function(req, res){
    console.log(req.body)
    new store().addNote()(req.body)
    
});
router.delete ("/notes", function(req, res){
    removeNote((id) = req.params.id)})


module.exports = router;