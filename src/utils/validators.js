const User = require("../models/user.model");

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};
const validatePassword = (password) => {

  console.log('Estoy en validatePassword')

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //  REGEX PASSWORD 1 Uppercase 1 Lowercase 1 number, minimo 8  

  // minimo 6 caracteres, una mayuscula, una minuscula, numero y un caracter especial
  return regex.test(String(password));
};
const usedEmail = async (email) => {
  const users = await User.find({ email: email });
  return users.length;
};

module.exports = { validateEmail, validatePassword, usedEmail };