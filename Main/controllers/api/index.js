const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

// Middleware
const errorMiddleware = require('./errorMiddleware');
const authenticationMiddleware = require('./authenticationMiddleware');
const validationMiddleware = require('./validationMiddleware');
const loggingMiddleware = require('./loggingMiddleware');

// Apply Middleware
router.use(loggingMiddleware);
router.use(errorMiddleware);

// Routes
router.use('/users', authenticationMiddleware, userRoutes);
router.use('/projects', authenticationMiddleware, projectRoutes);

module.exports = router;