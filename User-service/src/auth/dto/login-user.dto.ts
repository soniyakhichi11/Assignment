import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class loginUserDto{
    @IsEmail({},{message:'invalid email'})
        email:string
    
        @IsNotEmpty()
        @MinLength(5,{message:'password sholud have ateast 5 characters'})
        @MaxLength(20,{message:'password must not exceed more than 20 characters'})
        password:string
}