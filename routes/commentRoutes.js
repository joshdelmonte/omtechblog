const router = require("express").Router();
const { Comment } = require("../../models");

//create comment
router.post("/", async (req, res) => {
    try {
        const commentDB = await Comment.create({
            comment: req.body.comment,
            author_id: req.body.author_id,
            post_id: req.body.post_id,
        });
        return res.status(200).json(commentDB);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(commentDelete);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;