const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

//Dashboard routes and Home routes are incomplete files
//also 

router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      console.log(user);
  
      res.render('dashboard', {
        layout: 'main',
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.post('/', withAuth, async (req, res) => {
//     try {
//       const newProject = await Project.create({
//         ...req.body,
//         user_id: req.session.user_id,
//       });

  
//       res.status(200).json(newProject);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });
  
//   router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const projectData = await Project.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!projectData) {
//         res.status(404).json({ message: 'No project found with this id!' });
//         return;
//       }
  
//       res.status(200).json(projectData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;