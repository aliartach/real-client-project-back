import mongoose from "mongoose";
import PasswordValidator from "password-validator";

const Schema = mongoose.Schema;

// Custome password validation function
const validatePassword = (value) => {
  const schema = new PasswordValidator();

  // Here we define the password requirements
  schema
    .is().min(8)           // Minimum length 8
    .is().max(50)          // Maximum length 50
    .has().uppercase()     // The password must have uppercase letters
    .has().lowercase()     // The password must have lowercase letters
    .has().digits()        // The password must have digits
    .has().not().spaces(); // The password should not have spaces

  // Here we validate the password against the schema
  const validationResult = schema.validate(value, { list: true });

  // Check if there are validation errors
  if (validationResult.length > 0) {
    return { isValid: false, errors: validationResult };
  }

  return { isValid: true, errors: [] };
}

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword,
      message: 'Password does not meet the requirements',
    },
  },
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);