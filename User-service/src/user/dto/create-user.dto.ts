import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, MaxLength, Min, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/common/user-role.enum";


export class CreateUserDto{
    @ApiProperty({example:101})
    @IsOptional()
    @IsInt()
    @Min(1)
    userId?:number;

    @ApiProperty({example:"alpha beta"})
    @IsNotEmpty()
    @Length(3,30,{message:'Name must be between 3 and 30 character'})
    name:string

    @ApiProperty({example:"alpha@example.com"})
    @IsEmail({},{message:'invalid email'})
    email:string
     
    @ApiProperty({example:"Strongpassword"})
    @IsNotEmpty()
    @MinLength(5,{message:'password sholud have ateast 5 characters'})
    @MaxLength(20,{message:'password must not exceed more than 20 characters'})
    password:string
    
    @ApiProperty({example:'student', enum:['student','moderator']})
    @IsEnum(UserRole,{
        message:'role must be either student or moderator'
    })
    role:UserRole

}