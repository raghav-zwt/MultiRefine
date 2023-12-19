import bcrypt, { hash } from "bcrypt";

const hashPassword = async (Password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (Password, hashPassword) => {
  try {
    const comparePassword = await bcrypt.compare(Password, hashPassword);
    return comparePassword;
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };