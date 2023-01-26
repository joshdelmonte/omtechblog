const router = require("express").Router();
const { Post } = require("../../models");

//create post
router.post("/", async (req, res) => {
    try {
        const postDB = await Post.create({
            title: req.body.title,
            comment: req.body.comment,
            user_id: req.session.userId,
        });
        return res.status(200).json(postDB);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});



router.put("/:id", async (req, res) => {
    try {
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(updatePost);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(deletePost);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;