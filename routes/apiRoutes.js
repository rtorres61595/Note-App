const router = require("express").Router();
const store = require("../db/store")

//router.get returns all notes

//routher.post addNote(req.body)

//routher.delete (:id) = req.params.id

//don't forget to export

module.exports = (app) => {

    app.get("api/store", function(req, res){
        res.json(notes);
    });

    app.post("api/store", function(req, res){
        addNote.push(req.body);
        res.json(true);
    });

    app.delete("api/store", function(req, res){
        res.json({id: req.params.id})
    });

};