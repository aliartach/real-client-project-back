import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // minlength: 8, // At least 8 characters
    // validate: {
    //   validator: function(value) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    //   },
    //   message: "Password must contain at least 8 characters, one uppercase, lowercase, number, and special character"
    // }
  },
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
