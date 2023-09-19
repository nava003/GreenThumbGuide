const router = require('express').Router();
const { Plant } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add a new plant
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new plant record in the database, associating it with the logged-in user
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id, // This associates the plant with the logged-in user
    });

    res.status(201).json(newPlant); // Use status 201 for resource creation
  } catch (err) {
    res.status(400).json(err); // Handle errors, e.g., validation errors
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this ID!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
