import bcrypt from "bcryptjs";
export const generatePassword = (planText: string) => {
    return bcrypt.hashSync(planText,10);
};

    export const comparePassword = (password: string,hashPassword: string) => {
        return bcrypt.compareSync(password,hashPassword);
    };