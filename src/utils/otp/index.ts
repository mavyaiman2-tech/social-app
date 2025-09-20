export const generateOTP = ():string => {
   return  Math.floor(100000 + Math.random() * 900000)as unknown as string;
}
export const generateOTPExpiry = (time:number)=>{
    return new Date(Date.now() + time );
}