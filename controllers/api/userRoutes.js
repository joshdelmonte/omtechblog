const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
    try {
        console.log("req.body", req.body);
        const userDB = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            
        });
        console.log("userDB", userDB);
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

// login
router.post("/login", async (req, res) => {
    try {
        const userDB = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userDB) {
            res.status(400).json({
                message: "Incorrect user input. Please try again",
            });
            return;
        }
        //validate password
        const validPassword = await userDB.validatePassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect user input. Please try again",
            });
            return;
        }
        //save data
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedInUserData = userDB;
            console.log("-SAVED-", req.session.cookie);

            res.status(200).json({
                user: userDB,
                message: "Alright we're in!",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Logout
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

