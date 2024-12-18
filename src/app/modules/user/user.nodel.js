import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Mongoose Schema for User
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [4, 'Password must be at least 4 characters long.'],
    },
   balance: {
      type: Number,
      default: 0,
     
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  // Only hash the password if it's new or modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare entered password with the stored hashed password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
export const User = model('User', UserSchema);
