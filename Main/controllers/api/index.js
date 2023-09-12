const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');

// Middleware
const errorMiddleware = require('./errorMiddleware');
const authenticationMiddleware = require('./authenticationMiddleware');
const validationMiddleware = require('./validationMiddleware');
const loggingMiddleware = require('./loggingMiddleware');

router.use('/users', userRoutes);
router.use('/plant', plantRoutes);

// Apply Middleware
router.use(loggingMiddleware);
router.use(errorMiddleware);

// Routes
router.use('/users', authenticationMiddleware, userRoutes);
router.use('/projects', authenticationMiddleware, projectRoutes);

module.exports = router;