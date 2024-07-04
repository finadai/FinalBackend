const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');

router.get('/', authenticate, authorizeAdmin, usersController.getAllUsers);

router.delete('/', authenticate, authorizeAdmin, usersController.deleteInactiveUsers);

router.post('/premium/:uid', authenticate, usersController.changeUserRole);

router.post('/:uid/documents', authenticate, usersController.uploadDocuments);

module.exports = router;


