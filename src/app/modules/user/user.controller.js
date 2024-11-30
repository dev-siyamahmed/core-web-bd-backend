import { UserServices } from "./user.service.js";


const createUser = async (req, res) => {
    try {
        const { user } = req.body;
        const result = await UserServices.createUserIntoDB(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
            err: err.errors,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserServices.getAllUsersFromDB();

        if (users.length === 0) {
            return res.status(404).json({
                message: 'Users not found',
                status: false,
            });
        }
        res.status(200).json({
            message: 'Users retrieved successfully',
            status: true,
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            status: false,
        });
    }
};


export const UserController = {
    createUser,
    getAllUsers
}