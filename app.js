const express = require("express")
const Song = require("./models/song")
var cors = require('cors')

const app = express()
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

// get all songs in db
router.get("/songs", async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err) {
        console.log(err)
    }
})

// grab single song from db
router.get("/songs/:id", async (req,res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// POST REQ for adding songs to DB
router.post("/songs", async (req, res) => {
    try {
        console.log("Incoming song data:", req.body)  // <== log this

        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log("Saved song:", song)
    } catch (err) {
        console.error("Error saving song:", err)  // <== log the error
        res.status(400).send({ error: err.message })
    }
})

router.put("/songs/:id", async (req, res) => {
    // first find the song and update the song the front end wants us to update
    // need to request the id of the song from request
    // and the find it in the database and update it
    try {
        const song = req.body
        await Song.updateOne({ _id: req.params.id }, song)
        console.log(song)
        res.sendStatus(204)
    } catch (err) {
        console.error("PUT error:", err)
        res.status(400).send({ error: err.message })
    }
})

// delete a song from db
router.delete("/songs/:id", async (req, res) => {
    try {
        const result = await Song.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.use("/api", router)
console.log("Server is running on port 3000")
app.listen(3000)