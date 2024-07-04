const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');
const viewsController = require('../controllers/views.controller');

router.get('/', viewsController.getHomePage);
router.get('/login', viewsController.getLoginPage);
router.get('/register', viewsController.getRegisterPage);
router.get('/cart', authenticate, viewsController.getCartPage);
router.get('/checkout', authenticate, viewsController.getCheckoutPage);
router.get('/admin/users', authenticate, authorizeAdmin, viewsController.getAdminUsersPage);

module.exports = router;

