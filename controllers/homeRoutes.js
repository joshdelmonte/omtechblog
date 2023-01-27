const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
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

router.get("/post/:id", (req, res) => {
    res.render("post", { layout: "main" });
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signup", { layout: "main" });
});

router.get("/dashboard", auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ["password"] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        console.log(user);
        res.render("dashboard", { ...user, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        const post = postData.get({ plain: true });
        res.render("post", { layout: "main", ...post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        const post = postData.get({ plain: true });
        res.render("edit", { layout: "main", ...post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});
//Logout
router.get("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.render("login")
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;