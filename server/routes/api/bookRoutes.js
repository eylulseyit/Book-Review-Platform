const router = require("express").Router();
const { Book } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json(err);
    }
    router.post("/", async (req, res) => {
        try {
            const { title, author } = req.body;

            const newBook = await Book.create({
                title,
                author,
            });

            res.status(201).json(newBook);
        } catch (err) {
            res.status(500).json(err);
        }
    });

});

module.exports = router;
