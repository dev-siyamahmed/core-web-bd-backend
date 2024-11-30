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

export const UserController = {
    createUser
}