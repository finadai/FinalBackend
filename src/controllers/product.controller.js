const productDao = require('../DAO/product.dao');
const userDao = require('../DAO/user.dao.mongo');
const nodemailer = require('nodemailer');

exports.deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    const userId = req.user._id;

    try {
        const product = await productDao.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (product.owner.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
        }

        await productDao.deleteOne({ _id: productId });

        if (product.owner) {
            const owner = await userDao.findById(product.owner);
            if (owner && owner.role === 'premium') {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: owner.email,
                    subject: 'Producto eliminado',
                    text: `El producto ${product.name} ha sido eliminado.`
                };

                await transporter.sendMail(mailOptions);
            }
        }

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

