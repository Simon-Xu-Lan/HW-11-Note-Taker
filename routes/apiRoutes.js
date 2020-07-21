var fs = require("fs");
const uuidv1 = require("uuidv1");

module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            var notesJSON = [].concat(JSON.parse(data));
            // console.log(notesJSON);
            return res.json(notesJSON);
        });
    });

    app.post("/api/notes", function (req, res) {
        console.log(req.body)
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            var notesJSON = [].concat(JSON.parse(data));
            var newNote = req.body;
            console.log("save", newNote);
            newNote.id = uuidv1();
            notesJSON.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(notesJSON) + "\n", function (
                err
            ) {
                if (err) throw err;
            });
            return res.json(notesJSON);
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            var notesJSON = [].concat(JSON.parse(data));
            notesJSON = notesJSON.filter(function (note) {
                return note.id !== req.params.id;
            })
            fs.writeFile("./db/db.json", JSON.stringify(notesJSON) + "\n", function (
                err
            ) {
                if (err) throw err;
            });
            res.json(notesJSON);
        })
    });
};    


