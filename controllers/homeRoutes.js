const router = require('express').Router();
const { Plant, User } = require('../models');
const withAuth = require('../utils/auth');
const handlebars = require('handlebars');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {logged_in: req.session.logged_in});
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
  console.log(req.session.logged_in);
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/registration', (req, res) => {
  res.render('registration');
});

router.get('/plantGallery', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const plantData = await Plant.findAll();

    // Serialize data so the template can read it
    const plants = plantData.map((plant) => plant.get({ plain: true }));
    
    res.render('plantGallery', {
      plants,
      logged_in: req.session.logged_in
    });
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json(err);
  }
});


module.exports = router;
