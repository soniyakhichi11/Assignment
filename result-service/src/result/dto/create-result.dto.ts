import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min, } from "class-validator";

export class CreateResultDto{
    @ApiProperty({example:101})
    @IsInt()
    @Min(1)
    studentId:number;

    @ApiProperty({example:'alpha beta'})
    @IsString()
    @IsNotEmpty()
    studentName:string;

    @ApiProperty({example:85})
    @IsNumber()
    marks:number;

    @ApiProperty({example:100})
    @IsNumber()
    total:number;

    @ApiProperty({example:'A'})
    @IsString()
    @IsNotEmpty()
    grade:string;

}