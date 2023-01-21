const router = require(`express`).Router()

router.use(`/users`, require(`./userRoutes.js`))
router.use(`/posts`, require(`./postRoutes.js`))
router.use(`/comments`, require(`./commentRoutes.js`))

module.exports = router