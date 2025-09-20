import { config } from "dotenv";
config();
export const devConfig = {
    PORT: process.env.PORT,
    // cloudinary
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
  
    // mongodb
    DB_URL: process.env.DB_URL,
  
    // email
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  
    // jwt
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  };