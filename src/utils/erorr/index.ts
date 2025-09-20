export class AppError extends Error{
    constructor(message:string,public statusCode:number,
        public errorsDetails?:Object[]
    // record<string, any>)
    ){
        super(message)
    }
}
export class conflictException extends AppError{
    constructor(message:string,errorsDetails?:Object[]){
        super(message,409,errorsDetails)
    }
}
export class NotFoundException extends AppError{
    constructor(message:string,errorsDetails?:Object[]){
        super(message,404,errorsDetails)
    }
}
export class NotAuthorizedException extends AppError{
    constructor(message:string,errorsDetails?:Object[]){
        super(message,401,errorsDetails)
    }
}
export class ForbiddenException extends AppError{
    constructor(message:string,errorsDetails?:Object[]){
        super(message,403,errorsDetails)
    }
}

export class BadRequestException extends AppError{
    constructor(message:string,errorsDetails?:Object[]){
        super(message,400,errorsDetails)
    }
}
