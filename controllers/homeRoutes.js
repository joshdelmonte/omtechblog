const express = require("express");
const router = express.Router();

const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll()
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("home", { layout:"main", posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login", { layout: "main" });
});

// router.get("/post/:id", (req, res) => {



module.exports = router;