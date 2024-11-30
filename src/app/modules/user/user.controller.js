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
            message: 'Something went wrong',
            status: false,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { balance } = req.body; 

        // Validate balance
        if (balance === undefined || isNaN(balance)) {
            return res.status(400).json({
                message: 'Invalid balance value. Please provide a valid number.',
                status: false,
            });
        }

        // Update User balance using the service
        const updatedUser = await UserServices.updateUserFromDB(userId, balance);

        // If user not found
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found.',
                status: false,
            });
        }

        // Respond with success
        res.status(200).json({
            message: 'Balance updated successfully.',
            status: true,
            data: updatedUser,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            message: 'Something went wrong.',
            status: false,
            error: error.message,
        });
    }
}

export const UserController = {
    createUser,
    getAllUsers,
    updateUser
}