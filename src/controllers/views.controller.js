exports.getHomePage = (req, res) => {
    res.render('home', { user: req.user });
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.getCartPage = (req, res) => {
    res.render('cart', { user: req.user });
};

exports.getCheckoutPage = (req, res) => {
    res.render('checkout', { user: req.user });
};

exports.getAdminUsersPage = async (req, res) => {
    const users = await userDao.find({}, 'first_name last_name email role');
    res.render('admin-users', { users });
};

