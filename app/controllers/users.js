const userService = require('../services/users');
const responseHandler = require('../helpers/handleResponse');

/**
 * Get all users
 */
const getItems = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const response = responseHandler.success('Users retrieved successfully', users);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get a single user by ID
 */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            const response = responseHandler.notFoundError('User not found');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User retrieved successfully', user);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Create a new user
 */
const createItem = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await userService.createUser({ name, email, password, role });
        const response = responseHandler.success('User created successfully', newUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Update a user by ID
 */
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await userService.updateUserById(id, updateData);
        if (!updatedUser) {
            const response = responseHandler.notFoundError('User not found');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User updated successfully', updatedUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUserById(id);
        if (!deletedUser) {
            const response = responseHandler.notFoundError('User not found');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User deleted successfully', deletedUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get users with their courses (Maestro-Detalle)
 */
const getUsersWithCursos = async (req, res) => {
    try {
        const users = await userService.getUsersWithCursos();
        const response = responseHandler.success('Users and courses retrieved successfully', users);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    getUsersWithCursos
};
