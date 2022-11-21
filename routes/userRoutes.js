const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
    try {
        //ORIGINALLY "dbUserData"
        const userDB = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.is_admin,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = userDB;
            return res.status(200).json(userDB);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// user login
router.post("/login", async (req, res) => {
    try {
        const userDB = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userDB) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again!",
            });
            return;
        }
        //checks that password is valid using custom instance method in ./models/user.js
        const validPassword = await userDB.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect email or password. Please try again!",
            });
            return;
        }
        //save data to session for use elsewhere
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = userDB;
            console.log("🚀", req.session.cookie);

            res.status(200).json({
                user: userDB,
                message: "You are now logged in!",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// User Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;