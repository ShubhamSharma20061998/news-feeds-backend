const Users = require("../models/userModel");

const nameSchema = {
  notEmpty: {
    errorMessage: "name is required",
  },
  isLength: {
    options: { min: 3, max: 30 },
    errorMessage: "The name must be minimum 3 to maximum of 30 characters.",
  },
};

const emailRegisterSchema = {
  notEmpty: {
    errorMessage: "email is required",
  },
  isEmail: {
    errorMessage: "invalid email format",
  },
  custom: {
    options: async value => {
      const user = await Users.findOne({ email: value });
      if (user) {
        throw new Error("email already registered");
      } else {
        return true;
      }
    },
  },
};

const emailLoginSchema = {
  notEmpty: {
    errorMessage: "email is required",
  },
};

const passwordLoginSchema = {
  notEmpty: {
    errorMessage: "password is required",
  },
};

const passwordRegisterSchema = {
  notEmpty: {
    errorMessage: "password is required",
  },
  isStrongPassword: {
    options: {
      minLength: 8,
      maxLength: 128,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage: "password should contain 8 - 128 characters with atleast one lowercase, uppercase ,number and symbol",
  },
};

const userRegisterValidation = {
  name: nameSchema,
  email: emailRegisterSchema,
  password: passwordRegisterSchema,
};

const userLoginValidation = {
  email: emailLoginSchema,
  password: passwordLoginSchema,
};

module.exports = {
  userLoginValidation,
  userRegisterValidation,
};
