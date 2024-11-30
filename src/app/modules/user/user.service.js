import { User } from "./user.nodel.js";



const createUserIntoDB = async (user) => {
    const result = await User.create(user);
    return result;
};





export const UserServices = {
    createUserIntoDB,
    
  };
  