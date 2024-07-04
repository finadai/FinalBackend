const userDao = require('../daos/user.dao');
const nodemailer = require('nodemailer');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userDao.find({}, 'first_name last_name email role');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.deleteInactiveUsers = async (req, res) => {
    try {
        const now = new Date();
        const threshold = new Date(now.getTime() - 30 * 60 * 1000); // Cambiar a 2 días (48 * 60 * 60 * 1000) para producción

        const inactiveUsers = await userDao.find({ last_connection: { $lt: threshold } });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        inactiveUsers.forEach(async (user) => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Cuenta eliminada por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a inactividad.'
            };

            await transporter.sendMail(mailOptions);
            await userDao.deleteOne({ _id: user._id });
        });

        res.status(200).json({ message: 'Usuarios inactivos eliminados y notificados.' });
    } catch (error) {
        console.error('Error al eliminar usuarios inactivos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
