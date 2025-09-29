import { z } from "zod";
import { GENDER } from "../../utils/common/enum";
import { registerDto } from "./auth.dto";
import { loginDto } from "./auth.dto";
import { verifyDto } from "./auth.dto";

export const registerSchema = z.object<registerDto>({
     fullName: z.string().min(3).max(25) as unknown as string,
     email: z.email() as unknown as string,
     password: z.string() as unknown as string,
     phoneNumber: z.string().optional() as unknown as string,
     // gender: z.enum(GENDER) as unknown as GENDER,

});

export const loginSchema = z.object<loginDto>({
     email: z.email() as unknown as string,
     password: z.string() as unknown as string,
});
export const verifySchema = z.object<verifyDto>({
     email: z.email() as unknown as string,
     otp: z.string() as unknown as string,
});
