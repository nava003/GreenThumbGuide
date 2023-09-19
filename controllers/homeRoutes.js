const router = require('express').Router();
const { Plant, User } = require('../models');
const withAuth = require('../utils/auth');
const handlebars = require('handlebars');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
    // // Get all projects and JOIN with user data
    // const plantData = await Plant.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/get-plant-data/:plant_name', async (req, res) => {

  const searchData = await Plant.findOne({ 
    where: { plant_name: decodeURI(req.params.plant_name) }
  });
  
  const plant = searchData.get({ plain: true });

  let plantString = fs.readFileSync('./views/plantData.handlebars', 'utf-8');

  const template = handlebars.compile(plantString);

  const renderedHTML = template(plant);

  res.json(renderedHTML);
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/plant', async (req, res) => {
  try {
    res.render('plant');
    // const projectData = await Project.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // const project = projectData.get({ plain: true });

    // res.render('project', {
    //   ...project,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
