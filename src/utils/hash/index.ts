import bcrypt from "bcryptjs";
export const generatehash = (planText: string) => {
    return bcrypt.hashSync(planText,10);
};

    export const comparehash= async(password: string,hashPassword: string) => {
        return bcrypt.compareSync(password,hashPassword);
    };