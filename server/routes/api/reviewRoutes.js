const router = require("express").Router();
const { Review, User, Book } = require("../../models");
const authenticate = require("../../middleware/authMiddleware");

router.post("/", authenticate, async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        const newReview = await Review.create({
            userId: req.user.id, // Token'dan gelen kullanıcı ID'si
            bookId,
            rating,
            comment,
        });

        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Kitap yorumlarını listeleme
router.get("/book/:bookId", async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { bookId: req.params.bookId },
            include: [User],
        });

        res.json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
