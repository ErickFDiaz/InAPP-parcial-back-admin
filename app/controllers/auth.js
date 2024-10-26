const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/generateToken');
const userService = require('../services/users');
const responseHandler = require('../helpers/handleResponse');

// TODO: Login!
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Usar el servicio para obtener el usuario por email
        const user = await userService.getUserByEmail(email);

        if (!user) {
            const response = responseHandler.notFoundError('User not found');
            return responseHandler.send(res, response);
        }

        // Compara la contraseña con la almacenada
        const checkPassword = await compare(password, user.password);

        // Si la contraseña es válida, genera un token
        if (checkPassword) {
            const tokenSession = await tokenSign(user);  // Genera el token JWT
            const response = responseHandler.success('Login successful', {
                user,
                tokenSession
            });
            return responseHandler.send(res, response);
        } else {
            // Si la contraseña es incorrecta, devuelve un error
            const response = responseHandler.unauthorizedError('Invalid password');
            return responseHandler.send(res, response);
        }

    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        return responseHandler.send(res, response);
    }
};

// TODO: Register user!
const registerCtrl = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Encripta la contraseña
        const passwordHash = await encrypt(password);

        // Crea el usuario en la base de datos
        const registerUser = await userService.createUser({
            email,
            name,
            password: passwordHash
        });

        const response = responseHandler.success('User registered successfully', registerUser);
        return responseHandler.send(res, response);

    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        return responseHandler.send(res, response);
    }
};

module.exports = { loginCtrl, registerCtrl };