import { User } from "./user.nodel.js";



const createUserIntoDB = async (user) => {
    const result = await User.create(user);
    return result;
};

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
};


export const updateUserFromDB = async (userId, balance) => {
    const result = await User.findByIdAndUpdate( userId, { balance }, 
    );
    return result;
};


export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    updateUserFromDB

};
