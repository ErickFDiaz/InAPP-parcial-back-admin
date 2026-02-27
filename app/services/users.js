const userModel = require('../models/users');

const createUser = async (userData) => {
    try {
        const newUser = new userModel(userData);
        return await newUser.save();
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        return await userModel.find({});
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
};

const getUserById = async (id) => {
    try {
        return await userModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving user by ID: ' + error.message);
    }
};

const updateUserById = async (id, updateData) => {
    try {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};


const deleteUserById = async (id) => {
    try {
        return await userModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        throw new Error('Error retrieving user by email: ' + error.message);
    }
};

const getUsersWithCursos = async () => {
    try {
        return await userModel.aggregate([
            {
                $lookup: {
                    from: 'cursos',        // name of the target collection
                    localField: '_id',     // field from the input document
                    foreignField: 'instructor', // field from the documents of the "from" collection
                    as: 'cursos'           // output array field
                }
            },
            {
                $project: {
                    // At least 3 fields from Users
                    name: 1,
                    email: 1,
                    role: 1,
                    // At least 3 fields from Cursos
                    'cursos.titulo': 1,
                    'cursos.categoria': 1,
                    'cursos.precio': 1
                }
            }
        ]);
    } catch (error) {
        throw new Error('Error retrieving users with courses: ' + error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail,
    getUsersWithCursos
};